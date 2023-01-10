import React, { useEffect, useState } from "react";
import Boxes from "./Boxes";

const Grid = (props) => {
	let boxes = [];
    const [player1,setGamePlayer1] = useState('O');
    const [player2,setGamePlayer2] = useState('X');
	/* let player1 = "O"; // User
	let player2 = "X"; // Bot */
    const possibilities = [
        [1,2,3],
        [1,4,7],
        [7,8,9],
        [3,6,9],
        [4,5,6],
        [2,5,8],
        [1,5,9],
        [3,5,7]
    ]

	for (let i = 1; i <= 9; i++) {
		boxes[i] = { id: "box-" + i, order: i };
	}

	const [filledBoxes, setFilledBoxes] = useState([]);
	const [checkClick, setNextClickValue] = useState("player1");
    const [gameStart,setGameStartStatus] = useState(false);
    
	const getBoxValueHandler = (boxValue) => {
        let filledBoxesOrders = filledBoxes.map((data) => { return parseInt(data.order);  });
        if(!filledBoxesOrders.includes(parseInt(boxValue.order)))
        {
            let clickedPlayer = getClickedPlayer(checkClick);
            if (checkClick === "player1") {
                setNextClickValue((prevData) => {
                    return "player2";
                });
            } else {
                setNextClickValue((prevData) => {
                    return "player1";
                });
            }
            setFilledBoxes((prevData) => {
                return [
                    { order: parseInt(boxValue.order), value: clickedPlayer },
                    ...prevData,
                ];
            });
        }

	};

	useEffect(() => executeBotMove(), [filledBoxes]);

	const getClickedPlayer = (data) => {
		return data === "player1" ? player1 : player2;
	};

	const executeBotMove = (dataProps) => {
        
        if(filledBoxes.length > 0)
        {
            let player1boxes = filledBoxes.filter(value => value.value === player1).map((data) => { return parseInt(data.order);  });
            let player2boxes = filledBoxes.filter(value => value.value === player2).map((data) => { return parseInt(data.order);  });
            if(player1boxes.length >= 3)
            {
                var is_winning = possibilities.map((value) => {

                    let filteredArray = value.filter(function(obj) { 
                        return player1boxes.indexOf(obj) !== -1; 
                    });

                    if(filteredArray.length === 3)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }).filter(v => v);

                if(is_winning.length > 0)
                {
                    setFilledBoxes((prevData) => {
                        return [];
                    });
                    setNextClickValue((prevData) => {
                        return "player1";
                    });
                    alert('YOU WIN');
                    setGameStartStatus(false);
                    
                    return;
                }
            }
            
            if(player2boxes.length >= 3)
            {
                let is_winning = possibilities.map((value) => {

                    let filteredArray = value.filter(function(obj) { 
                        return player2boxes.indexOf(obj) !== -1; 
                    });

                    if(filteredArray.length === 3)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }).filter(v => v);

                if(is_winning.length > 0)
                {
                    setFilledBoxes((prevData) => {
                        return [];
                    });
                    setNextClickValue((prevData) => {
                        return "player1";
                    });
                    alert('BOT WIN');
                    setGameStartStatus(false);
                    
                    return;
                }
            }
            
            if((player1boxes.length + player2boxes.length) >= 9)
            {
                setFilledBoxes((prevData) => {
                    return [];
                });
                setNextClickValue((prevData) => {
                    return "player1";
                });
                alert('TIE');
                setGameStartStatus(false);
                
                return;
            }


            if(checkClick === 'player2')
            {
                let filledBoxesOrders = filledBoxes.map((data) => { return parseInt(data.order);  });
                let emptyBoxes = boxes.filter(value => !filledBoxesOrders.includes(value.order));
                var emptyBox = emptyBoxes[Math.floor(Math.random()*emptyBoxes.length)];
                
                /* if(player2boxes.length > 1)
                {
                    possibilities.forEach(element => {
                        
                        let temp = [];
                        
                        element.forEach(elementValue => {
                            
                            if(!player2boxes.includes(elementValue) && !filledBoxesOrders.includes(elementValue))
                            {
                                temp.push(elementValue);
                            }
                            
                        });

                        if(temp.length == 1)
                        {
                            let temp2 = [];
                            element.forEach(elementValue => {

                                if(player2boxes.includes(elementValue) && !temp2.includes(elementValue))
                                {
                                    temp2.push(elementValue);
                                }
                            });

                            if(temp2.length != 2)
                            {
                                temp = [];
                            }
                       
                            if(temp.length == 1)
                            {
                                emptyBox.id = 'box-'+temp[0];
                                emptyBox.order = temp[0];
                                return true;
                            }
                        }
                        

                    });
                }
                else */ if(player1boxes.length > 1)
                {
                    possibilities.forEach(element => {
                        
                        let temp = [];
                        
                        element.forEach(elementValue => {
                            
                            if(!player1boxes.includes(elementValue) && !filledBoxesOrders.includes(elementValue))
                            {
                                temp.push(elementValue);
                            }
                            
                        });

                        if(temp.length == 1)
                        {
                            let temp2 = [];
                            element.forEach(elementValue => {

                                if(player1boxes.includes(elementValue) && !temp2.includes(elementValue))
                                {
                                    temp2.push(elementValue);
                                }
                            });

                            if(temp2.length != 2)
                            {
                                temp = [];
                            }
                       
                            if(temp.length == 1)
                            {
                                emptyBox.id = 'box-'+temp[0];
                                emptyBox.order = temp[0];
                                return true;
                            }
                        }
                        

                    });
                }


                setTimeout(() => {
                    setNextClickValue((prevData) => { return "player1"; });
                    setFilledBoxes((prevData) => {
                        return [
                            { order: emptyBox.order, value: getClickedPlayer('player2') },
                            ...prevData,
                        ];
                    });
                    
                }, 500);
            }
        }

	};

    const gameStartHandler = (playerSign) => {
        if(playerSign == 'O')
        {
            setGamePlayer1('O');
            setGamePlayer2('X');
        }
        else
        {
            setGamePlayer1('X');
            setGamePlayer2('O');
        }
        setGameStartStatus(true);
    }


	return (
		<div className="bg-cyan-700">
			<div className="h-screen">
                <div className="title">
                    <h2 className="text-white text-center text-4xl py-5 font-semibold">Tic Tac Toe</h2>
                </div>
                {!gameStart && (<div className="mx-auto md:w-3/4 lg:w-1/5 w-11/12">
                    <h2 className="text-lg font-semibold text-white text-center mb-4">Choose Your Weapon</h2>
                    <div className="grid grid-cols-2 w-full">
                        <div 
                            className="h-36 border-4 m-2 cursor-pointer text-7xl md:text-9xl text-white text-center flex justify-center items-center" 
                            onClick={() => gameStartHandler(player1)}>
                            {player1}
                        </div>
                        <div 
                            className="h-36 border-4 m-2 cursor-pointer text-7xl md:text-9xl text-white text-center flex justify-center items-center" 
                            onClick={() => gameStartHandler(player2)}>
                            {player2}
                        </div>
                    </div>
                </div>)}
                {gameStart && (<div className="mx-auto md:w-3/4 lg:w-2/5 w-11/12">
                    <div className="grid grid-cols-3 w-full">
                        {boxes.map((value) => (
                            <Boxes
                                className=""
                                filledBoxes={filledBoxes}
                                key={value.id}
                                order={value.order}
                                boxValueHandler={getBoxValueHandler}
                            />
                        ))}
                    </div>
                </div>)}
			</div>
		</div>
	);
};

export default Grid;
