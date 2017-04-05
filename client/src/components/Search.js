import React from 'react'
import { findDOMNode } from 'react-dom'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'

export default ({ search }) => {

    let refInput,
        doSearch = () => {
            if (refInput) {
                let keyWords = findDOMNode(refInput).value               
                search(keyWords)                
            }
        }

    return (
        <Form>
            <FormGroup>
                <FormControl style={{width:'200px',display:'inline-block'}} inputRef={ref => refInput = ref} type="text" placeholder="Search" onKeyDown={ev => ev.keyCode == 13 ? doSearch() : null} />
                <Button style={{width:'80px'}} type="button" onClick={doSearch}>Search</Button>
            </FormGroup>
           
        </Form>
    )
}

