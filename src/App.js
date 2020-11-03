import React, { useState } from 'react';
import './App.sass';
import Avatar from '@material-ui/core/Avatar';
import { Button, Icon } from 'semantic-ui-react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ReactTagInput from "@pathofdev/react-tag-input";

// import api from './untils/api'

 



function App() {


  const [show, setShow] = useState(false);
  const [nome, setName] = useState('');
  const [descricao, setDescription] = useState('');
  const [times, setTimes] = useState([]);
  const [tags, setTags] = useState([]);
  const [ids, setIds] = useState(0);
  const [idAtual, setIdAtual] = useState(0);
  
  const cleanInputs = () =>{
    setName('');
    setDescription('');
    setTags([]);
    setIdAtual();
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openModalClean = () => {
    handleShow();
    cleanInputs();
  }



  const ordena = () =>{
    let time = times;
    time.sort((a,b)=>{
      if(a.id < b.id) return -1;
      if(a.id > b.id) return 1;
      return 0;
    })
  }

  const verificaIdExistente = () =>{
    let time = times;
    time.splice(idAtual, 1);
    time.push({id: idAtual,name: nome, description: descricao, tag: tags});
    setTimes(time);
  }

  const apagaTime=()=>{
    let time = times;
    time.splice(idAtual, 1);
    setTimes(time);
    ordena();
    handleClose();
  }

  const saveChanges = () => {
    let time = times;
    if(idAtual<=ids){
      verificaIdExistente()
    } else{
      time.push({id: ids,name: nome, description: descricao, tag: tags});
      setTimes(time);
      setIds(ids+1);
    }
    ordena();
    handleClose();
  };




  // api.get('players/topscorers?season=2019&league=61').then(response=>{
  //   if(response.ok){
  //     setTeams(response.data);
  //     console.log(team)
  //   }
  // })


  return (
    <div className="App">
      <header className="App-header">
        <div className="divHeaderL" >
          <a href="./index.js" className="title" >Squad Management Tool</a>
        </div>
        <div className="divHeaderR" >
          <strong className="nameAvatar" >Name</strong>
          <Avatar className="iconName" > N </Avatar>
        </div>
      </header>
      <main className="mainStyle" >

        <div className="myTeams" >

          <div className="divTitleTeams" >

            <div className="titleTeams">
              <h2 className="titleMyTeams" >My Teams</h2>
            </div>

            <div className="btnTeams">
              <>
                <Button animated color='violet' onClick={openModalClean} >
                  <Button.Content visible>Add</Button.Content>
                  <Button.Content hidden>
                    <Icon name='add' />
                  </Button.Content>
                </Button>
                <Modal show={show} onHide={handleClose} centered backdrop="static" size="lg" >
                  <Modal.Header closeButton>
                    <Modal.Title style={{color: '#8200fa', fontWeight: 'bold'}}> Create your Team</Modal.Title>
                  </Modal.Header>
                  <Modal.Body bsPrefix="bodyTeams">
                    <div className="modalTeams">
                      <div className="modalIntern">
                        <Form>
                          <Form.Group >
                            <Form.Label>Team name</Form.Label>
                            <Form.Control type="name" value={nome} placeholder="Insert team name" onChange={ text =>{setName(text.target.value)}} />
                          </Form.Group>

                          <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" value={descricao} type="text" rows={10} onChange={text=>{setDescription(text.target.value)}} />
                          </Form.Group>

                        </Form>
                      </div>

                      <div className="modalInternTag">
                        <label className="labelTag" >Tags</label>

                        <ReactTagInput 
                          tags={tags} 
                          placeholder="Type and press enter"
                          maxTags={10}
                          editable={true}
                          readOnly={false}
                          removeOnBackspace={true}
                          onChange={(newTags) => setTags(newTags)}/>
                      </div>

                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
                

              </>
            </div>
            
          </div>
          
          <div className="listTeams" >
          
          <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                  {times.map((items) => {
                    return <tr>
                      <th>{items.name}</th>
                      <th>{items.description}</th>
                      
                      <th>
                      <Icon link
                        onClick={()=>{
                          setIdAtual(items.id);
                          apagaTime();
                        }} name="trash alternate" color="green" />

                        <Icon link 
                        onClick={()=>{
                          setName(items.name);
                          setDescription(items.description);
                          setTags(items.tag);
                          setIdAtual(items.id);
                          handleShow();
                        }}  name="edit outline"/>
                                                </th>
                    </tr>})}
                </tbody>
            </table>

          </div>

        </div>

        <div className="divTopEPick" >
          <div className="divTop">

          </div>

          <div className="divPick">

            
          </div>

        </div>

      </main>
    </div>

    

  );
}

export default App;
