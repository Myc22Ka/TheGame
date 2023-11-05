import React from "react";
import options from "../../../config.json";
import { Col, Container, Row } from "react-bootstrap";
import ShopCell from "./ShopCell";

const Market: React.FC = () => {
  const splitArray = () => {
    const chunkSize = Math.floor(Math.sqrt(options.pieces.types.length));
    const result = [];
    for (let i = 0; i < options.pieces.types.length; i += chunkSize) {
      result.push(options.pieces.types.slice(i, i + chunkSize));
    }
    return result;
  };

  return (
    <Container className="m-2 market w-auto">
      {splitArray().map((row, key) => {
        return (
          <Row key={key}>
            {row.map((col, index) => (
              <Col key={index} className="p-0">
                <ShopCell piece={col} />
              </Col>
            ))}
          </Row>
        );
      })}
    </Container>
  );
};

export default Market;
