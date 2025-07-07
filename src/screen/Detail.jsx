import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import { Calendar, CalendarClock, CircleDollarSign, Clock, MapPin, Ticket, } from 'lucide-react';

function Detail() {
  const { id } = useParams(); // รับ ID จาก URL
  const [concert, setConcert] = useState(null);

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/concert/${id}`).then((response) => {
      setConcert(response.data);
    }).catch((error) => {
      console.error("Error fetching concert:", error);
    });
  }, [id]);



  if (!concert) return <div>Loading...</div>;
  return (
    <div className='flex flex-col min-h-screen bg-base-100 '>
      <div>
        <Navbar />
      </div>

      <div className="kanit-medium" >
        <div className='p-5 '>
          <h1 className="text-2xl kanit-medium text-center">{concert.ConcertName}</h1>
        </div>

        <div className='bg-gray-950 p-5 shadow:lg flex w-full flex-col sm:flex-row'>
          <div className='grid h-full grow place-items-center'>
            <figure className="h-[350px]">
              <img
                src={concert.Poster}
                alt="Poster"
                className="h-full object-contain"
              />
            </figure>
          </div>
          <div className='grid h-full grow '>
            <div className="grid grid-rows-1 sm:grid-cols-2 gap-4 p-4 ">
              <div className="flex items-center gap-2 ">
                <Calendar size={50} />
                <div className='flex flex-col p-4'>
                  <p className='text-lg text-gray-500'>วันที่แสดง</p>
                  <span>{dayjs(concert.OpenSaleDate).locale('th').format('D MMMM YYYY')}</span>
                </div>
              </div>

              <div className='flex items-center gap-2 '>
                <CalendarClock size={50} />
                <div className='flex flex-col p-4 '>
                  <p className='text-lg text-gray-500'>วันเปิดจำหน่าย</p>
                  <span>{dayjs(concert.OpenSaleDate).locale('th').format('D MMMM YYYY')}</span>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Clock size={50} />
                <div className='flex flex-col p-4'>
                  <p className='text-lg text-gray-500'>เวลาเปิดจำหน่าย</p>
                  <span>{(concert.OpenSaleTimes).slice(0, 5)} น.</span>
                </div>
              </div>
              <div className='flex items-center gap-2 ' >
                <CircleDollarSign size={50} />
                <div className='flex flex-col p-4 '>
                  <p className='text-lg text-gray-500'>ราคาบัตร</p>
                  <span>{(concert.Price).toLocaleString('th-TH')} บาท</span>
                </div>
              </div>
              <div className='flex items-center gap-2 ' >
                <MapPin size={50} />
                <div className='flex flex-col p-4 '>
                  <p className='text-lg text-gray-500'>สถานที่แสดง</p>
                  <span>อิมแพค อารีน่า</span>
                </div>
              </div>
              <div className='flex items-center gap-2 ' >
                <Ticket size={50} />
                <div className='flex flex-col p-4 '>
                  <p className='text-lg text-gray-500'>สถานะของบัตร</p>
                  <span>สถานะ</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div >
      <div className='kanit-medium'>
        <h2 className='text-2xl max-w-screen-xl mx-auto m-5'>ผังที่นั่งและรอบการแสดง</h2>
        <div className="card w-[1200px] h-[400px] bg-base-300 card-xl shadow-sm  max-w-screen-xl mx-auto">
          <div className="card-body">
            <h2 className="card-title">Xlarge Card</h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="justify-end card-actions">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail