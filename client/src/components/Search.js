import React from 'react'
import { findDOMNode } from 'react-dom'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'

export default ({ search }) => {

    let refInput,
        doSearch = (ev) => {
            ev.stopPropagation()
            if (ev.type == 'click' ||  ev.keyCode == 13) {
                let keyWords = findDOMNode(refInput).value               
                search(keyWords)                
            }
            if(ev.keyCode == 13){
                ev.preventDefault()
            }
            return false
        }

    return (
        <Form onKeyDown = {(ev)=>{ev.stopPropagation(); return false}} onSubmit={()=>{return false}}>
            <FormGroup>
                <FormControl style={{width:'200px',display:'inline-block'}} inputRef={ref => refInput = ref} type="text" placeholder="Search" onKeyDown={doSearch} />
                <Button style={{width:'80px'}} type="button" onClick={doSearch}>Search</Button>
            </FormGroup>           
        </Form>
    )
}

