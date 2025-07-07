import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import ModalRegister from './ModalRegister';
import Swal from 'sweetalert2';
function ModalLogin({ setUser }) {
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const toggleLoginPassword = () => setShowLoginPassword(!showLoginPassword);

    const [loginemail, setLoginEmail] = useState('');
    const [loginpassword, setLoginPassword] = useState('');


    const [error, setError] = useState('');
    const [al, setAl] = useState('');

    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        if (error || al) {
            setIsVisible(true);

            const hideTimer = setTimeout(() => {
                setIsVisible(false);
            }, 2500);

            const clearTimer = setTimeout(() => {
                setError('');
                setAl('');
            }, 3000);

            return () => {
                clearTimeout(hideTimer);
                clearTimeout(clearTimer);
            };
        }
    }, [error, al]);


    const CloseModal = () => {
        setLoginEmail('');
        setLoginPassword('');
    }

    const loginMember = async () => {
        try {
            const response = await Axios.post('http://localhost:3001/api/loginMember', {
                email: loginemail,
                password: loginpassword
            }, {
                withCredentials: true
            })
            console.log('response:', response.data.userData)

            Swal.fire({
                title: 'เข้าสู่ระบบสำเร็จ',
                icon: 'success',
                confirmButtonText: 'รับทราบ!',
                customClass: {
                    title: 'kanit-medium',
                    confirmButton: 'kanit-medium',
                }
            });
            setUser(response.data.userData)
            setLoginEmail('');
            setLoginPassword('');
            document.activeElement.blur();
            document.getElementById('my_modal_1').close();

        } catch (error) {
            console.log('error', error)
            setError('ล็อกอินล้มเหลว')

        }
    }

    return (
        <div>
            <ModalRegister />
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => {
                            document.activeElement.blur(); 
                            CloseModal(); 
                        }}>✕</button>
                    </form>
                    <h2 className=" text-3xl kanit-medium flex justify-center mb-5" >Concert Ticket</h2>
                    <fieldset className="fieldset bg-base-100 rounded-box w-xs p-4 mx-auto">
                        <legend className="fieldset-legend kanit-medium text-center text-xl">เข้าสู่ระบบ</legend>

                        <label className="label kanit-medium text-sm">อีเมล</label>
                        <label className="input kanit-medium">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <input type="email" className="kanit-medium" placeholder="กรอกอีเมล"
                                value={loginemail}
                                onChange={(event) => {
                                    setLoginEmail(event.target.value)
                                }}
                            />
                        </label>
                        <label className="label kanit-medium text-sm">รหัสผ่าน</label>
                        <label className="input kanit-medium">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                    ></path>
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>

                            <input type={showLoginPassword ? 'text' : 'password'} className="kanit-medium" placeholder="กรอกรหัสผ่าน"
                                value={loginpassword}
                                onChange={(event) => {
                                    setLoginPassword(event.target.value)
                                }}
                            />
                            <button
                                type="button"
                                onClick={toggleLoginPassword}
                                className="absolute right-3 text-gray-500"

                            >
                                {showLoginPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                            </button>
                        </label>
                        <button className="btn mt-4 btn-primary kanit-medium text-sm" onClick={() => loginMember()} >เข้าสู่ระบบ</button>

                        <label className="kanit-medium text-center text-sm mt-2">หากท่านยังไม่เป็นสมาชิก</label>
                        <a className="kanit-medium text-center text-red-500 text-sm cursor-pointer" onClick={() => document.getElementById('my_modal_2').showModal()}>สมัครสมาชิก</a>
                        {error && (
                            <div
                                role="alert"
                                className={`alert alert-error mt-3 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span className='kanit-medium'>{error}</span>
                            </div>
                        )}

                        {al && (
                            <div
                                role="alert"
                                className={`alert alert-success mt-3 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span className='kanit-medium'>{al}</span>
                            </div>
                        )}
                    </fieldset>
                </div>

            </dialog>
        </div>

    )
}

export default ModalLogin