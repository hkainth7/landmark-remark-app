import React, {useState} from "react";
import {db} from '../firebase-config';
import {doc, updateDoc, deleteDoc} from 'firebase/firestore';
import styled from "styled-components";

const Container = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 70vw;
    max-width: 750px;
    margin: 0 auto;
`;

const Title = styled.h2`
    font-size: 20px;
    font-weight: 400;
`;

const Input = styled.input`
    width: 30vw;
    outline: none;
    background-color: white;
    border: 2px solid black;
    padding: 8px;
    border-radius: 4px;
    font-size: 16px;
`;

const ListContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const RemarkCard = styled.div`
    padding: 12px;
    border: 2px solid black;
    border-radius: 4px;
`;

const Remark = styled.p`
    margin: 0;
    font-size: 22px;
    font-weight: 500;
`;

const Button = styled.button`
    background-color: #00337C;
    border: none;
    color: white;
    padding: 8px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
`;

const RemarkContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const RemarkControls = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default function NotesList({notes}){

    const [newUpdatedRemark, setNewUpdatedRemark] = useState("");
    const [filteredData, setFilteredData] = useState([])

    

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        const newFilter = notes.filter((note) => {
            return note.remark.includes(searchWord);
        });
        setFilteredData(newFilter);
    } 

    const updateRemark = async (id) => {
        const noteDoc = doc(db, "notes", `${id}`);
        const newRemark = {remark: newUpdatedRemark};
        await updateDoc(noteDoc, newRemark);
    }

    const deleteRemark = async (id) => {
        const noteDoc = doc(db, "notes", `${id}`);
        await deleteDoc(noteDoc);
    }

    
    return(
        <Container>
            <Title>Remarks</Title>
            <Input type="text" placeholder='Search for remarks' onChange={handleFilter}/>
            <ListContainer>    
                {filteredData.length !== 0 ? filteredData.map(({id, remark, lat, long, createdBy}) => (
                        <RemarkCard key={id}>
                            <RemarkContainer>
                                <Remark>{remark}</Remark>
                                <Button onClick={() => deleteRemark(id)}>Delete Remark</Button>
                            </RemarkContainer>
                            <p>Lat: {lat}</p>
                            <p>Long: {long}</p>
                            <p>CreatedBy: {createdBy}</p>
                            <RemarkControls>
                                <Input type="text" placeholder="edit remark" onChange={(e) => setNewUpdatedRemark(e.target.value)} />
                                <Button onClick={() => updateRemark(id, remark)} >Edit Remark</Button>
                            </RemarkControls>
                        </RemarkCard>
                    )) : notes.map(({id, remark, lat, long, createdBy}) => (
                        <RemarkCard key={id}>
                            <RemarkContainer>
                                <Remark>{remark}</Remark>
                                <Button onClick={() => deleteRemark(id)}>Delete Remark</Button>
                            </RemarkContainer>
                            <p>Lat: {lat}</p>
                            <p>Long: {long}</p>
                            <p>CreatedBy: {createdBy}</p>
                            <RemarkControls>
                                <Input type="text" placeholder="edit remark" onChange={(e) => setNewUpdatedRemark(e.target.value)} />
                                <Button onClick={() => updateRemark(id, remark)} >Edit Remark</Button>
                            </RemarkControls>
                        </RemarkCard>
                    ))
                    
                }
            </ListContainer>
        </Container>
    )
};
