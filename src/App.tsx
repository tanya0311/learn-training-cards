import React, { ChangeEvent, useEffect, useState } from "react"
import "./App.css"
import { v1 } from "uuid"

export type CardType = {
	id: string
	word: string
	translate: string
	overturned?: boolean
}

function App() {
	const [cards, setCards] = useState<CardType[]>([
		{
			id: v1(),
			word: "hello",
			translate: "привет",
			overturned: false,
		},
	])

	const [word, setWord] = useState<string>("")
	const [translate, setTranslate] = useState<string>("")

	// useEffect(() => {
	// 	localStorage.setItem("card", JSON.stringify(cards))
	// }, [cards]
	// )
	// useEffect(() => {
	// 	let learnCards = localStorage.getItem("card")
	// 	if(learnCards){
	// 		let newValue=JSON.parse(learnCards)
	// 		setCards(newValue)
	// 	}
	// }, []
	// )

	const createWord = (e: ChangeEvent<HTMLInputElement>) => {
		setWord(e.currentTarget.value)
	}

	const createTranslate = (e: ChangeEvent<HTMLInputElement>) => {
		setTranslate(e.currentTarget.value)
	}

	const addCardHandler = () => {
		const newCard: CardType = { id: v1(), word: word, translate: translate }
		setCards([...cards, newCard])
		setWord("")
		setTranslate("")
	}

	const turnCard = (id: string) => {
		const turnCards = [...cards]

		setCards(
			turnCards.map((el) =>
				el.id === id ? { ...el, overturned: !el.overturned } : el
			)
		)
	}

	// const setToLocalStorageHandler = () => {}
	// const getFromLocalStorageHandler = () => {
	// 	let learnCards = localStorage.getItem("card")
	// }
	

	return (
		<div className='App'>
			<h2>English word cards</h2>
			<div className='container'>
				<input
					type='text'
					placeholder='word'
					value={word}
					onChange={createWord}
				/>
				<input
					type='text'
					placeholder='translate'
					value={translate}
					onChange={createTranslate}
				/>
				<button onClick={addCardHandler}>add</button>

				<div>
					{cards.map((card) => {
						return (
							<div
								key={card.id}
								className={"card" + (card.overturned ? " overturned" : "")}
								onClick={() => turnCard(card.id)}
							>
								{card.overturned ? card.translate : card.word}
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default App
