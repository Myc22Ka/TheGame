import React from "react";
import options from "../../../config.json";
import { Col, Container, Row, Stack } from "react-bootstrap";
import ShopCell from "./ShopCell";

const Market: React.FC = () => {
  // const splitArray = () => {
  //   const chunkSize = Math.floor(Math.sqrt(options.pieces.types.length));
  //   const result = [];
  //   for (let i = 0; i < options.pieces.types.length; i += chunkSize) {
  //     result.push(options.pieces.types.slice(i, i + chunkSize));
  //   }

  //   console.log(result);
  //   return result;
  // };
  // splitArray();

  return (
    <div
      className="market p-4"
      style={{
        gridTemplateColumns: `repeat(${Math.floor(
          Math.sqrt(options.pieces.types.length)
        )}, 1fr)`,
        gridTemplateRows: `repeat(${Math.floor(
          Math.sqrt(options.pieces.types.length)
        )}, 1fr)`,
        width: "fit-content",
      }}
    >
      {options.pieces.types.map((piece, i) => (
        <ShopCell piece={piece} key={i} />
      ))}
    </div>
  );
};

export default Market;

//   <div className="market p-2">
//     {splitArray().map((row, key) => {
//       return (
//         <Row
//           key={key}
//           className="justify-content-center align-items-center"
//           style={{ width: "fit-content" }}
//         >
//           {row.map((col, index) => (
//             <Col key={index} className="p-3 col">
//               <ShopCell piece={col} />
//             </Col>
//           ))}
//         </Row>
//       );
//     })}
//   </div>
