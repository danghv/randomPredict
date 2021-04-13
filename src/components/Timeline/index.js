import React, { useEffect, useState } from "react";
import axios from "axios";

import { convertResultToText, genTimeline } from "../../utils/genTimeline";
import { Table } from "antd";
import { URL } from "../../constants/kubet";
import { DatePicker, Space } from 'antd';
import moment from 'moment'

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

const Timeline = () => {
  const [lot, setLot] = useState("A");
  const [display, setDisplay] = useState('5banh')
  const [date, setDate] = useState(moment().format('DD/MM/YYYY'))

  const [results, setResults] = useState([]);
  // console.log('results.......', results)
  const numbers = results.map((item) => item.number);
  const convertedTX = convertResultToText({ type: "TX", data: numbers });
  //   console.log('convertedTX', convertedTX.length)
  const tx = genTimeline(convertedTX);

  const convertedCL = convertResultToText({ type: "CL", data: numbers });
  //   console.log('convertedCL', convertedCL.length)
  const cl = genTimeline(convertedCL);

  const convertedRH = convertResultToText({ type: "RH", data: numbers });
  //   console.log('convertedRH', convertedRH.length)
  const rh = genTimeline(convertedRH);

  const convertedNH = convertResultToText({ type: "NH", data: numbers });
  //   console.log('convertedRH', convertedRH.length)
  const nh = genTimeline(convertedNH);

  const convertedPoker = convertResultToText({ type: "Poker", data: numbers });
  //   console.log('convertedRH', convertedRH.length)
  const pk = genTimeline(convertedPoker);

  const convertedDV = convertResultToText({ type: "ONE_TX", data: numbers });
  const dv_tx = genTimeline(convertedDV);

  const convertedDVCL = convertResultToText({ type: "ONE_CL", data: numbers });
  const dv_cl = genTimeline(convertedDVCL);

  const convertedChucTX = convertResultToText({ type: "TEN_TX", data: numbers });
  const chuc_tx = genTimeline(convertedChucTX);

  const convertedChucCL = convertResultToText({ type: "TEN_CL", data: numbers });
  const chuc_cl = genTimeline(convertedChucCL);

  const convertedTramTX = convertResultToText({ type: "HUNDRED_TX", data: numbers });
  const tram_tx = genTimeline(convertedTramTX);

  const convertedTramCL = convertResultToText({ type: "HUNDRED_CL", data: numbers });
  const tram_cl = genTimeline(convertedTramCL);

  const convertedNganTX = convertResultToText({ type: "THOUSAND_TX", data: numbers });
  const ngan_tx = genTimeline(convertedNganTX);

  const convertedNganCL = convertResultToText({ type: "THOUSAND_CL", data: numbers });
  const ngan_cl = genTimeline(convertedNganCL);

  const convertedCNTX = convertResultToText({ type: "TEN_THOUSAND_TX", data: numbers });
  const cn_tx = genTimeline(convertedCNTX);

  const convertedCNCL = convertResultToText({ type: "TEN_THOUSAND_CL", data: numbers });
  const cn_cl = genTimeline(convertedCNCL);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const allRes = await axios.get(`http://localhost:5000/kubet/view/${lot}?date=12/04/2021`)
        const allRes = await axios.get(
          `${URL}/kubet/view/${lot}?date=${date}`
        );
        // console.log('allRes......', allRes)
        setResults(allRes.data.data);
      } catch (e) {
        console.log("e.......", e);
      }
    };

    fetchData();
  }, [lot, date]);
  function onChange(date, dateString) {
    console.log(date, dateString);
    setDate(dateString)
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          style={{ padding: 8, color: lot === "A" ? "blue" : "grey" }}
          onClick={() => setLot("A")}
        >
          Lot A
        </button>
        <button
          style={{ padding: 8, color: lot === "B" ? "blue" : "grey" }}
          onClick={() => setLot("B")}
        >
          Lot B
        </button>
        <button
          style={{ padding: 8, color: lot === "C" ? "blue" : "grey" }}
          onClick={() => setLot("C")}
        >
          Lot C
        </button>
      </div>
      <div>
      <button
          style={{ padding: 8, color: display === "5banh" ? "blue" : "grey" }}
          onClick={() => setDisplay('5banh')}
        >
          5 Banh
        </button>
        <button
          style={{ padding: 8, color: display === "keo_doi" ? "blue" : "grey" }}
          onClick={() => setDisplay('keo_doi')}
        >
          Kèo đôi
        </button>
        <button
          style={{ padding: 8, color: display === "tien_trung_hau" ? "blue" : "grey" }}
          onClick={() => setDisplay('tien_trung_hau')}
        >
          Tiền - Trung - Hậu
        </button>
      </div>

      <div>
      <Space direction="vertical">
        <DatePicker
          onChange={onChange}
          format="DD/MM/YYYY"
          defaultValue={moment(date, 'DD/MM/YYYY')}
        />
      </Space>
      </div>
      {
        display == '5banh' && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>Tài - Xỉu</h3>
          <Table bordered size="small" columns={columns} dataSource={tx} pagination={false} />
        </div>
        <div>
          <h3>Chẵn - Lẻ</h3>
          <Table bordered size="small" columns={columns} dataSource={cl} pagination={false} />
        </div>
        <div>
          <h3>Rồng - Hổ</h3>
          <Table bordered size="small" columns={columns} dataSource={rh} pagination={false} />
        </div>

        <div>
          <h3>Ngầu - Hầm</h3>
          <Table bordered size="small" columns={columns} dataSource={nh} pagination={false} />
        </div>

        <div>
          <h3>Poker</h3>
          <Table bordered size="small" columns={columns} dataSource={pk} pagination={false} />
        </div>
      </div>
        )
      }

      {
        display === 'keo_doi' && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>Đơn Vị - TX</h3>
          <Table bordered size="small" columns={columns} dataSource={dv_tx} pagination={false} />
        </div>
        <div>
          <h3>Đơn Vị - CL</h3>
          <Table bordered size="small" columns={columns} dataSource={dv_cl} pagination={false} />
        </div>
        <div>
          <h3>Chục - TX</h3>
          <Table bordered size="small" columns={columns} dataSource={chuc_tx} pagination={false} />
        </div>
        <div>
          <h3>Chục - CL</h3>
          <Table bordered size="small" columns={columns} dataSource={chuc_cl} pagination={false} />
        </div>
        <div>
          <h3>Trăm - TX</h3>
          <Table bordered size="small" columns={columns} dataSource={tram_tx} pagination={false} />
        </div>
        <div>
          <h3>Trăm - CL</h3>
          <Table bordered size="small" columns={columns} dataSource={tram_cl} pagination={false} />
        </div>

        <div>
          <h3>Ngàn - TX</h3>
          <Table bordered size="small" columns={columns} dataSource={ngan_tx} pagination={false} />
        </div>
        <div>
          <h3>Ngàn - CL</h3>
          <Table bordered size="small" columns={columns} dataSource={ngan_cl} pagination={false} />
        </div>

        <div>
          <h3>Chục Ngàn - TX</h3>
          <Table bordered size="small" columns={columns} dataSource={cn_tx} pagination={false} />
        </div>

        <div>
          <h3>Chục Ngàn - CL</h3>
          <Table bordered size="small" columns={columns} dataSource={cn_cl} pagination={false} />
        </div>
      </div>
        )
      }

{/* {
        display === 'tien_trung_hau' && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>Tiền Tam - TX</h3>
          <Table size="small" columns={columns} dataSource={dv_tx} pagination={false} />
        </div>
        <div>
          <h3>Tiền Tam - CL</h3>
          <Table columns={columns} dataSource={dv_cl} pagination={false} />
        </div>
        <div>
          <h3>Tiền Tam - CL</h3>
          <Table columns={columns} dataSource={dv_cl} pagination={false} />
        </div>
        <div>
          <h3>Chục - TX</h3>
          <Table columns={columns} dataSource={chuc_tx} pagination={false} />
        </div>
        <div>
          <h3>Chục - CL</h3>
          <Table columns={columns} dataSource={chuc_cl} pagination={false} />
        </div>
        <div>
          <h3>Trăm - TX</h3>
          <Table columns={columns} dataSource={tram_tx} pagination={false} />
        </div>
        <div>
          <h3>Trăm - CL</h3>
          <Table columns={columns} dataSource={tram_cl} pagination={false} />
        </div>

        <div>
          <h3>Ngàn - TX</h3>
          <Table columns={columns} dataSource={ngan_tx} pagination={false} />
        </div>
        <div>
          <h3>Ngàn - CL</h3>
          <Table columns={columns} dataSource={ngan_cl} pagination={false} />
        </div>

        <div>
          <h3>Chục Ngàn - TX</h3>
          <Table columns={columns} dataSource={cn_tx} pagination={false} />
        </div>

        <div>
          <h3>Chục Ngàn - CL</h3>
          <Table columns={columns} dataSource={cn_cl} pagination={false} />
        </div>
      </div>
        )
      } */}
    </>
  );
};

export default Timeline;
