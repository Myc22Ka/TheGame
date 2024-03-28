import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import Activators from "src/components/Activators/Activators";
import { PieceType } from "src/modules/Piece/types";
import Ability from "./Ability";

type BodyPropsType = {
  piece: PieceType;
  show: boolean;
};

const Body: React.FC<BodyPropsType> = ({ piece, show }) => {
  return (
    <Offcanvas.Body>
      <Stack>
        <div className="piece-description">{piece.description}</div>
        <Activators activators={piece.activators} level={piece.level} show={show} destroyChance={piece.destroyChance} />
        {piece.abilities && (
          <>
            <hr className="hr" />
            {piece.abilities.map((ability) => (
              <Ability {...ability} key={ability.name} />
            ))}
          </>
        )}
      </Stack>
    </Offcanvas.Body>
  );
};

export default Body;
