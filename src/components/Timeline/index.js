import React, { useEffect, useState } from "react";
import axios from 'axios'

import { convertResultToText, genTimeline } from '../../utils/genTimeline'
import { Table } from "antd";
import { URL } from '../../constants/kubet'

const columns = [
  {
    dataIndex: "value1",
  },
  {
    dataIndex: "value2",
  },
  {
    dataIndex: "value3",
  },
  {
    dataIndex: "value4",
  },
  {
    dataIndex: "value5",
  },
  {
    dataIndex: "value6",
  },
];

// const data = [
//   {
//     value1: "R",
//     value2: "R",
//     value3: "R",
//     value4: "R",
//     value5: "R",
//     value6: "R",
//   },
//   {
//     value1: "R",
//     value2: "R",
//     value3: "R",
//     value4: "R",
//   },
//   {
//     value1: "R",
//     value2: "R",
//     value3: "R",
//     value4: "R",
//     value5: "R",
//     value6: "R",
//   },
// ];

const Timeline = () => {
      const [lot, setLot] = useState('A')

      const [results, setResults] = useState([])
      const numbers = results.map(item => item.number)
      const convertedTX = convertResultToText({type: 'TX', data: numbers})
    //   console.log('convertedTX', convertedTX.length)
      const tx = genTimeline(convertedTX)

      const convertedCL = convertResultToText({type: 'CL', data: numbers})
    //   console.log('convertedCL', convertedCL.length)
      const cl = genTimeline(convertedCL)

      const convertedRH = convertResultToText({type: 'RH', data: numbers})
    //   console.log('convertedRH', convertedRH.length)
      const rh = genTimeline(convertedRH)

      const convertedNH = convertResultToText({type: 'NH', data: numbers})
    //   console.log('convertedRH', convertedRH.length)
      const nh = genTimeline(convertedNH)

      const convertedPoker = convertResultToText({type: 'Poker', data: numbers})
    //   console.log('convertedRH', convertedRH.length)
      const pk = genTimeline(convertedPoker)

      useEffect(() => {
        const fetchData = async () => {
          try {
            // const allRes = await axios.get(`http://localhost:5000/kubet/view/${lot}?date=12/04/2021`)
            const allRes = await axios.get(`${URL}/kubet/view/${lot}?date=12/04/2021`)
            setResults(allRes.data.data)
          } catch(e) {
            console.log('e.......', e)
          }
        }

        fetchData()
      }, [lot]);

    return (
        <>
        <div
            style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}>
            <button
                style={{padding: 8, color: lot === 'A' ? 'blue' : 'grey'}}
                onClick={() => setLot('A')}
            >Lot A</button>
            <button
                style={{padding: 8, color: lot === 'B' ? 'blue' : 'grey'}}
                onClick={() => setLot('B')}
            >Lot B</button>
            <button
                style={{padding: 8, color: lot === 'C' ? 'blue' : 'grey'}}
                onClick={() => setLot('C')}
            >Lot C</button>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                <h3>Tài - Xỉu</h3>
                <Table columns={columns} dataSource={tx} pagination={false} />
            </div>
            <div>
                <h3>Chẵn - Lẻ</h3>
                <Table columns={columns} dataSource={cl} pagination={false} />
            </div>
            <div>
                <h3>Rồng - Hổ</h3>
                <Table columns={columns} dataSource={rh} pagination={false} />
            </div>

            <div>
                <h3>Ngầu - Hầm</h3>
                <Table columns={columns} dataSource={nh} pagination={false} />
            </div>

            <div>
                <h3>Poker</h3>
                <Table columns={columns} dataSource={pk} pagination={false} />
            </div>
        </div></>
    );
};

export default Timeline;
