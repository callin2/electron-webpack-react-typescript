import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, {ThemeProvider} from "styled-components";

import * as ReactGridLayout from 'react-grid-layout';

console.log('ReactGridLayout', ReactGridLayout)

var ResponsiveReactGridLayout = ReactGridLayout.Responsive;

import 'semantic-ui-css/semantic.css';
import {Header, Grid, Form, Segment, Button, Message, Image, Accordion, Icon} from "semantic-ui-react";
import Dock from 'react-dock'


interface AppState {
    isLeftDockVisible: boolean
    activeIndex: number
}


class App extends React.Component<{},AppState> {
    constructor(props) {
        super(props)
        this.state = {
            isLeftDockVisible: true,
            activeIndex: -1
        }
    }

    layout = [
        {i: '', x: 0, y: 0, w: 2, h: 2, static: true},
        {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
        {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state

        return <div className='login-form' style={{height: '100%'}}>

            <ReactGridLayout className="layout" layouts={this.layout}
                                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                                    >
                <div key="1">1</div>
                <div key="2">2</div>
                <div key="3">3</div>
            </ReactGridLayout>


            <Grid
                textAlign='center'
                style={{height: '100%'}}
                verticalAlign='middle'
                columns={1}
            >


                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src='/logo.png'/>
                        {' '}Log-in to your account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />

                            <Button color='teal' fluid size='large'>Login</Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <a href='#'>Sign Up</a>
                    </Message>
                </Grid.Column>


            </Grid>

            <Dock position='left' isVisible={this.state.isLeftDockVisible}>
                {/* you can pass a function as a child here */}
                <div onClick={() => this.setState({isLeftDockVisible: !this.state.isLeftDockVisible})}>X</div>

                <Segment inverted>
                    <Accordion inverted>
                        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                            <Icon name='dropdown' />
                            What is a dog?
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 0}>
                            <p>
                                A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a
                                {' '}welcome guest in many households across the world.
                            </p>
                        </Accordion.Content>

                        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                            <Icon name='dropdown' />
                            What kinds of dogs are there?
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 1}>
                            <p>
                                There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of
                                {' '}dog that they find to be compatible with their own lifestyle and desires from a companion.
                            </p>
                        </Accordion.Content>

                        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                            <Icon name='dropdown' />
                            How do you acquire a dog?
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 2}>
                            <p>
                                Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.
                            </p>
                            <p>
                                A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to
                                {' '}assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your
                                {' '}dog from a shelter, helps give a good home to a dog who may not find one so readily.
                            </p>
                        </Accordion.Content>
                    </Accordion>
                </Segment>



            </Dock>
        </div>
    }
}


ReactDOM.render( <App/>,  document.getElementById('app'));