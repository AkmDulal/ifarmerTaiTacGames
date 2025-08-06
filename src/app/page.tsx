"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { initializePlayers } from "@/store/features/ticTacToe/slice";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

const Home = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(initializePlayers({ player1Name, player2Name }));
    router.push("/tic-tac-toe/game");
  };

  const isFormValid = player1Name.trim() !== "" && player2Name.trim() !== "";

  return (
    <div className="min-h-screen games  bg-[#f0f0f0] flex flex-col items-center justify-center">
      <div className=" w-[60%]  rounded-lg ">
        <div className="bg-white h-[20px] w-full "></div>
        <div className="bg-[#2a85f7] p-6">
          <h1 className="text-2xl  text-white font-bold text-center mb-6">
            Player Setup
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Player 1 Name (X)"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              required
              placeholder="Enter player 1 name"
            />
            <Input
              label="Player 2 Name (O)"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              required
              placeholder="Enter player 2 name"
            />
            <Button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-[#cccccc] disabled:cursor-not-allowed cursor-pointer"
            >
              Start Game
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
