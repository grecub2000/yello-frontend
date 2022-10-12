import { Draggable } from "react-beautiful-dnd";
import { LoremIpsum } from "lorem-ipsum";
import { generateFromString } from "generate-avatar";
import React, { useMemo, useState } from "react";
import {Input} from "@material-ui/core";
import styled, { css } from "styled-components";
import Avatar from '@material-ui/core/Avatar';
import Comment from "./Comment";
import axios from "axios";

import {CommentSection} from 'react-comments-section';

import {
	// Avatar,
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Text,
	Divider,
    Stack,
} from "@chakra-ui/react";

const Container = styled.div`
    color:"yellow";
    padding:30px;

`;
const LeftDiv = styled.div`
    width: 55%; 
    float: left;
    color: white;
    border-right: 3px solid white; 
    max-height: 80vh;
    overflow-y: auto;
    margin-bottom: 30px;
`;
const RightDiv = styled.div`
    width: 40%; 
    float: right;
    color: white;
`;

const Title = styled.div`
    font-size: 30px;
`


const CardPopup = (item) => {
    
    const card = item.card;
    const user = JSON.parse(localStorage.getItem('userInfo'));
    console.log(user);
    const [commentInput, setCommentInput] = useState(
        {
          content: "",
          userId: user.userId,
          cardId: card.id
        });


    const cardPriority = ["⚪ No Priority",
        "🟡 Low",
        "🟠 Medium",
        "🔴 High",
        "🟣 Critical"]

    const cardType = [
        "📌 Task",
        "🌠 Story",
        "❌ Bug",
        "💻 SupportRequest"
    ]    
    // console.log(card);
    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(card);
        var newcomm = await saveComment();
        card.comments.push(newcomm);
        setCommentInput({...commentInput, content:""});
        
    }

    const saveComment = async () => {
        let url = "http://localhost:5000/api/comment/create"
        const res = await axios.post(url, commentInput);
        console.log(res.data);
        return res.data;
    }
    console.log(card);
    return(
        <Container>
            {/* <a>{card.title} {card.description}</a>
             */}
             <LeftDiv>
                <Title>{card.title}</Title>
                <br/>
                <Text style={{fontSize:20}}>Description</Text>
                <Text style={{fontSize:18}}>{card.description}</Text>
                <br/>
                <br/>
                <Text style={{fontSize:20}}>Comments</Text>
                <div>
                    <form
                
                    onSubmit = {handleSubmit}
                    style={{
                    display: "flex",
                    flex:3,
                    flexDirection:"row",
                    color:'white',
                    width:"90%",
                    margin:"0 auto",
                    padding:"10px",
                    float:"left"
                    }}
                    >
                    <Input 
                        required
                        placeholder="Comment"
                        color="success"
                        style={{
                        width:"50%",
                        color:'white',
                        padding:"10px"
                        }}
                        onChange={(e)=>{setCommentInput({
                        ...commentInput,
                        content : e.target.value
                        })}}
                        value={commentInput.content}

                        />
                    <Button variant="contained" type="submit">Submit</Button>
                    </form>

                    <div style={{float:"left"}}>
                        {card.comments.map((comment) => (<Comment comment={comment}/>))}
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>

            </LeftDiv>
            <RightDiv>
                <Stack spacing={20}>
                    <Text style={{fontSize:25}}>Card Details</Text>
                    <br />

                    <Text style={{fontSize:20}}>Sprint: {card.sprint?.descrption}</Text>
                    <br/>
                    <Text>
                        <Avatar
                            size="xs"
                            name={card.assignee?.firstName + " " + card.assignee?.lastName}
                            src={
                                card.assignee?.profilePicture
                            }
                            float="right"
						/>
                        Assignee: {card.assignee.firstName} {card.assignee.lastName}
                    </Text>
                    {/* <br/> */}
                    <Text>
                        <Avatar
                            size="xs"
                            name={card.reporter?.firstName + " " + card.reporter?.lastName}
                            src={
                                card.reporter?.profilePicture
                            }
						/>
                        Reporter: {card.reporter.firstName} {card.reporter.lastName}</Text>
                    <br/>
                    <Text>Card Type: {cardType[card.type]}</Text>
                    <Text>Priority: {cardPriority[card.priority]}</Text>
                    <br/>
                </Stack>    
            </RightDiv>
        </Container>
    )
}
export default CardPopup