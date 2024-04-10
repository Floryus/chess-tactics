"use client";

import { loadTactic } from "@/app/http";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Tactic } from "@/app/types";

export default function Browse() {

const userId = useUser().user?.id;

const [data, setData] = useState<Tactic[]>();

useEffect(() => {
    // Load the puzzle
    if(userId){
      console.log("User id found"+userId);
      console.log(loadTactic(userId));
      const data = loadTactic(userId);
      data.then((result) => {setData(result)});
    }
    else{
      console.log("No user id found")}
}, [userId]);

  return (
    <div className="grid-container">
      <div className="grid-item" style={{ gridColumn: "span 2" }}>Browse your Tactics Repetoire</div>
      <div className="grid-item" style={{ gridColumn: "4" }}>
        Select a Tag
      </div>
      <div className="grid-item">Id</div>
      <div className="grid-item">Last seen</div>
      <div className="grid-item">Due in</div>
      <div className="grid-item">Tags</div>
      {data?.map((tactic) => {
        return (
          <>
            <div className="grid-item" key={tactic.id}>{tactic.id}</div>
            <div className="grid-item">{tactic.created_at}</div>
            <div className="grid-item">{tactic.answerFen}</div>
            <div className="grid-item">{tactic.questionFen}</div>
          </>
        
        );
      })}
    </div>
  );}
