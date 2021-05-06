import React from 'react';
import './ProjectApp.css';
import axios from 'axios';
import Checkpoint from './component/Checkpoint/Checkpoint';
import { Accordion, Alert, Button, Card, Col, Row } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
import Task from './component/Task/Task';
import { ICheckpoint, IProjectState, ITask } from './interfaces/ProjectTrackingInterfaces';

class ProjectApp extends React.Component<{}, IProjectState> {
  constructor(props: any) {
    super(props);
    this.state = {
      projectId: 1,
      projectName: "",
      checkpoints: [],
      showAlert: false,
      isError: false,
    };  
  }
  
  serviceUrl = "http://localhost:8080/project";

  getProjectDetails() {
    axios
      .get(this.serviceUrl + "/1")
      .then((response) => {
        this.setState({...this.state, projectId: response.data.projectId, projectName: response.data.projectName, checkpoints: response.data.checkpoints});
      })
      .catch((e) => {
        this.setShowAlert(true, true);
        console.error(e);
      });
  }

  componentDidMount() {
    // axios call to fetch initial data
    this.getProjectDetails();
  }

  toggelTaskState = (taskId: number, checkpointId: number) => {
    const currentState = Object.assign({}, this.state);
    const checkpoint: any = currentState.checkpoints.find(
      (checkpoint: any) => checkpoint.checkpointId === checkpointId
    );
    const task = checkpoint.tasks.find((task: any) => task.taskId === taskId);
    task.taskCompleted = !task.taskCompleted;
    this.setState({...this.state, projectId: currentState.projectId, projectName: currentState.projectName,checkpoints: currentState.checkpoints});
  };

  handleSubmit = () => {
    // axios call to update the task in DB
    const options = {
      headers: { "content-type": "application/json" },
    };
    
    const inputPayload = this.prepareInputPayload(this.state);
    axios
      .post(this.serviceUrl, inputPayload, options)
      .then((response) => {
        this.setShowAlert(true, false);
        this.getProjectDetails();
      })
      .catch((e) => {
        this.setShowAlert(true, true);
        console.error(e);
      });
  };

  prepareInputPayload = (state: Readonly<IProjectState>) => {
    const payload = Object.assign(state);
    delete payload.showAlert;
    delete payload.isError;
    return payload;
  };

  setShowAlert = (val: boolean, isError: boolean) => {
    this.setState({ ...this.state, showAlert: val, isError: isError });
  };

  render() {
    return (
      <div className="center position-relative box-height page-font">
        <div>
          <Card>
            <Card.Body className="comp-header">
              <h3> {this.state.projectName}</h3>
            </Card.Body>
          </Card>
        </div>
        <div></div>
        <div className="accordion-container">
          <Accordion defaultActiveKey="0">
            {this.state.checkpoints.map(
              (checkpoint: ICheckpoint, i: number) => (
                <div key={`checkpoint${i}`}>
                  <Card>
                    <Accordion.Toggle
                      className="accordion-header"
                      as={Card.Header}
                      eventKey={`${i}`}
                    >
                      <Checkpoint {...checkpoint} />
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={`${i}`}>
                      <Card.Body>
                        <div>
                          <Row className="taskheader d-flex">
                            <Col className="leftpad">Tasks</Col>
                            <Col>Tasks Completed</Col>
                          </Row>
                        </div>
                        {checkpoint.tasks.map((task: ITask, index: number) => (
                          <div key={`task${i}${index}`}>
                            <Task
                              key={index}
                              {...task}
                              checkpointId={checkpoint.checkpointId}
                              taskCompletionHandler={this.toggelTaskState}
                            />
                          </div>
                        ))}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </div>
              )
            )}
          </Accordion>
        </div>
        <div>
          <Row>
            <Col>
              <div>
                {this.state.showAlert && (
                  <Alert
                    className={`${
                      this.state.showAlert ? "modal-alert animate" : ""
                    }`}
                    variant={this.state.isError ? "danger" : "success"}
                    onAnimationEnd={() => this.setShowAlert(false, false)}
                  >
                    {!this.state.isError
                      ? "Project saved in DB successfully"
                      : "Error: Please check if services are up and refresh the page"}
                  </Alert>
                )}
              </div>
            </Col>
            <Col>
              <Button
                className="comp-color"
                onClick={(e) => this.handleSubmit()}
                type="submit"
              >
                Save Project
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ProjectApp;


