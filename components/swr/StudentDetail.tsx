import * as React from 'react';
import useSWR from 'swr';

export interface StudentDetailProps {
    studentId: string
}

// 1 Tieng 
const MILISECOND_PER_HOUR = 60 * 60 *1000

export function StudentDetail ({studentId}: StudentDetailProps) {
    const {data, error, mutate, isValidating} = useSWR(`/students/${studentId}`, {
        // Loai Bo khi chuyen tab qua lai, Page co" Component StudenDetail bi goi lai. Tuy vao cach minh muon sai thui.
        revalidateOnFocus: false,
        // More Infor: https://swr.vercel.app/docs/api
        dedupingInterval: MILISECOND_PER_HOUR
    })

    function handleMutateClick() {
        // no doi gia tri moi: easy frontend , trong local thui nha. 
        // false: thi no se KO gui request len server de get lai du lieu, 
        // Neu true: thi sau khi sai tam gia tri moi o local, no se tu dong chay them send request de get lai Data tren server de update.
        mutate({name: 'easy frontend'}, false)
    }

  return (
    <div>
      Name: {data?.name || '--'}
      <button onClick={handleMutateClick}>Mutate</button>
    </div>
  );
}
