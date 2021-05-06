
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FC } from "react";

const Task: FC<any>= (props) => {
    return (
      <div>
        <input
          type="hidden"
          name={"taskId" + props.taskId}
          value={props.taskId}
        />
        <Row className="d-flex">
          <Col>{props.taskDescription}</Col>
          <Col>
            <input
              type="checkbox"
              name={"taskCompleted" + props.taskId}
              className=""
              defaultChecked={props.taskCompleted}
              onChange={(e: any) =>
                props.taskCompletionHandler(props.taskId, props.checkpointId)
              }
            />
          </Col>
        </Row>
      </div>
    );
}

export default Task;