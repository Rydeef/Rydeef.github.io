import React, { useEffect, useState } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect, useSelector } from 'react-redux'
import axios from 'axios'


const replacerStats = (e) => e.target.value.replace(/\D/, '')

const replacerName = (e) => e.target.value.replace(/[^A-Za-z0-9-]/, '')
let value
const blur = (e) => value = Number(e.target.value)
const blured = (e) => Number(e.target.value) < value ? e.target.value.replace(/./g, '') : e.target.value.replace(/\D/, '')

  const renderFieldStatsFrom = ({
    input,
    type
  }) => (
    <input {...input} maxLength="3" onBlur={e => input.onBlur(blur(e))} onChange={e => input.onChange(replacerStats(e))} type={type} />
  )
  const renderFieldStatsTo = ({
    input,
    type
  }) => (
    <input {...input} maxLength="3" onBlur={e => input.onBlur(blured(e))} onChange={e => input.onChange(replacerStats(e))} type={type} />
  )

  const renderFieldName = ({
    input,
    type
  }) => (
    <input {...input} maxLength="11" onChange={e => input.onChange(replacerName(e))} type={type} />
  )

  let FilterForm = (props) => {

    const { handleSubmit } = props
    const stats = ['Attack', 'Defense', 'HP', 'Special Attack', 'Special Defense', 'Speed']
    const formState = useSelector(state => state.form?.filter?.values);



    useEffect(() => {
      axios.get('https://pokemonapishort.herokuapp.com/PokeApi/getPokemonsTypes')
        .then(result => {
          props.setTypes(result.data.types)

        })
    }, [props.setTypes])


    const submit = () => {
      props.setTypesArray([])
      props.setLoading(true)
      props.setOpened(false)
      props.setIsErr(false)
      props.setCurrentPage(0)
      props.setLoadingPager(true)

      let arr = []
      if (formState) {
        for (const [key, value] of Object.entries(formState)) {

          if (props.types.includes(key) && value) {
            arr.push(key)

            props.setTypesArray([...arr])
          }
        }
      }

      props.setFilterObj({
        attack: props.attack,
        defense: props.defense,
        hp: props.hp,
        specialAttack: props.specialAttack,
        specialDefense: props.specialDefense,
        speed: props.speed,
        name: props.name

      })
    }

    useEffect(() => {

      for (let obj in props.filterObj) {

        if (typeof (props.filterObj[obj]) !== "string") {
          if (!props.filterObj[obj].from) {
            delete props.filterObj[obj].from
            if (!props.filterObj[obj].to) {

              delete props.filterObj[obj]
            }
          }
          else if (!props.filterObj[obj].to) {
            delete props.filterObj[obj].to
          }
          else if (props.filterObj[obj].from > props.filterObj[obj].to) {
            


          }
        }
      }

      if (props.filterObj.name === 'undefined') {
        props.filterObj.name = ""
      }

    }, [props?.filterObj])



    const [opened, setOpened] = useState(false)
    function hide() {
      opened ? (setOpened(false)) : (setOpened(true))
    }
    const [value, setValue] = useState()



    return (
      <form onSubmit={handleSubmit(submit)}>
        {stats.map((stat, index) => (
          <div className="filter-stats-main" key={index}>
            <label htmlFor={stat} >{stat}:</label>
            <Field name={`${stat.replace(" ", "")}From`} component={renderFieldStatsFrom} type="text" />
          -
            <Field name={`${stat.replace(" ", "")}To`} component={renderFieldStatsTo} type="text" />
          </div>
        ))}
        <div className="filter-stats-name">
          <label htmlFor="name">Name: </label>
          <Field name="name" component={renderFieldName} type="text" />
        </div>
        <div className="filter-stats-type">
          <div className="selector">
            <label htmlFor="selector-text">Types: </label>
            <div name="selector-text" type="text" className="selector-text" readOnly >{opened ? ("Hide type filter") : ("Open type filter")}</div>
            <div onClick={hide} className={"selector-btn"}>
              <div className={opened ? ("selector-btn-opened") : ("selector-btn-hidden")}></div>
            </div>
          </div>
          <div className={(opened ? ("dropdown-opened") : ("dropdown-hidden"))}>
            {props.types.map(type => (
              <div className="dropdown-container" key={type}>
                <label htmlFor="dropdown-check" key={Date.now()}>{type}</label>
                <Field component="input" name={type} type="checkbox" className="dropdown-checkbox" key={Math.random()} />
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="submit">Submit</button>
      </form >

    )

  }


  //@ts-ignore
  FilterForm = reduxForm({
    form: 'filter',

  })(FilterForm)


  // export default FilterForm

  const selector = formValueSelector('filter')
  export default connect(state => {
    const attack = { 
      from: Number(selector(state, "AttackFrom")), 
      to: Number(selector(state, "AttackTo")) 
    }
    const defense = { from: Number(selector(state, "DefenseFrom")), to: Number(selector(state, "DefenseTo")) }
    const hp = { from: Number(selector(state, "HPFrom")), to: Number(selector(state, "HPTo")) }
    const specialAttack = { from: Number(selector(state, "SpecialAttackFrom")), to: Number(selector(state, "SpecialAttackTo")) }
    const specialDefense = { from: Number(selector(state, "SpecialDefenseFrom")), to: Number(selector(state, "SpecialDefenseTo")) }
    const speed = { from: Number(selector(state, "SpeedFrom")), to: Number(selector(state, "SpeedTo")) }
    const name = String(selector(state, 'name'))

    return {
      attack,
      defense,
      hp,
      specialAttack,
      specialDefense,
      speed,
      name,
    }
  })
    (FilterForm)