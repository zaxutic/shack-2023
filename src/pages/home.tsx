
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useAtom } from "jotai";
import { datesInfoAtom } from ".";
import LoggedDay from "~/components/LoggedDay";
import UnloggedDay from "~/components/UnloggedDay";
import Calendar from "~/components/Calendar";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const [datePicked, setDatePicked] = useState<Date>(new Date());
  const [datesInfo, setDatesInfo] = useAtom(datesInfoAtom);
  const [dateInfo, setDateInfo] = useState(null);

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    initDateInfo();
  }, [datePicked])

  // Finds date inside datesInfo and returns it's corresponding array of information
  const initDateInfo = () => {
    for (const dateInfo of datesInfo) {
      const d1 = new Date(Object.keys(dateInfo)[0]!);
      if (isEqualDate(d1)) {
        setDateInfo(Object.values(dateInfo)[0]);
        return;
      }
    }
    setDateInfo(null);
  }

  // If given date is equal to 'datePicked'
  const isEqualDate = (d1: Date) => {
   return d1.getDate() === datePicked.getDate() &&
          d1.getMonth() === datePicked.getMonth() &&
          d1.getFullYear() === datePicked.getFullYear();
  }

  return (
    <div className="flex flex-col ">
      <div className='flex justify-between bg-gray-100 py-2 px-6'>
        <img className='h-10' src="https://static.thenounproject.com/png/335121-200.png"/>
        <div className='flex gap-4 items-center'>
          <p>{monthNames[datePicked?.getMonth()]}</p>
          <img className='h-7' src='https://png.pngtree.com/png-clipart/20190614/original/pngtree-vector-calendar-icon-png-image_3782243.jpg'/>
          <img className='h-5' src='https://cdn-icons-png.flaticon.com/512/3119/3119338.png' />
        </div>
      </div>

      <div className="py-4 px-6">
        <Calendar view="week" datePicked={datePicked} setDatePicked={setDatePicked}/>
      </div>

      {dateInfo ? <LoggedDay datePicked={datePicked}/> : <UnloggedDay datePicked={datePicked}/>}
  
    </div>
  );
}
