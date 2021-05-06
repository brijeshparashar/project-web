import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ICheckpoint } from "../../interfaces/ProjectTrackingInterfaces";
import { FC } from "react";

const Checkpoint: FC<ICheckpoint> = (props) => {
  return (
    <div>
      <Row>
        <Col>{props.description}</Col>
        <Col>{props.completionPercentage}%</Col>
      </Row>
    </div>
  );
}

export default Checkpoint;