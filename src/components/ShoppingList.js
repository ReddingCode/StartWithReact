import { plantList } from '../datas/plantList'
import PlantItem from './PlantItem'
import '../styles/ShoppingList.css'
import Categories from './Categories'
import { useState } from 'react'



function ShoppingList({cart, updateCart}) {
	const [activeCategory, setActiveCategory] = useState('')
	const categories = plantList.reduce(
		(acc, plant) =>
			acc.includes(plant.category) ? acc : acc.concat(plant.category),
		[]
	)
	function addToCart(name, price) {
		const currentPlantSaved = cart.find((plant) => plant.name === name )
		if (currentPlantSaved) {
			const cartFilteredCurrentPlant = cart.filter(
				(plant) => plant.name !== name 
					)
			updateCart([...cartFilteredCurrentPlant,
						 {name,price, amount: 1}
			])
		}
		else {
			updateCart([...cart, {name, price, amount: 1}])
		}

	}

	return (
		<div className='hj-shopping-list'>
			< Categories 
			categories={categories}
			setActiveCategory={setActiveCategory}
			activeCategory={activeCategory}
			/>
			<ul>
				{categories.map((cat) => (
					<li key={cat}>{cat}</li>
				))}
			</ul>
			<ul className='hj-plant-list'>
				{plantList.map(({ id, cover, name, water, light, price }) => (
					<div  key={id} >
						<PlantItem cover={cover} name={name} water={water} light={light} price={price} />
						<button onClick={() => addToCart(name, price) }> Ajouter </button>
					</div>
					
					
				))}
			</ul>
		</div>
	)
}

export default ShoppingList