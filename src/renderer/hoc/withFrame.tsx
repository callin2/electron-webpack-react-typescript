import * as React from 'react';
import { Header, Icon, Loader, Menu, Button } from 'semantic-ui-react'
import { ParentSize } from '@vx/responsive';

export default function withFrame(BaseComponent) {
    class WrappedComponent extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return <React.Fragment>
                {/*<Header size='small' attached='top' color='orange' inverted dividing>*/}
                    {/*<Loader active inline />*/}
                    {/*{this.props['title']}*/}
                {/*</Header>*/}
                <Menu attached='top' size={'mini'}>
                    <Menu.Item name={this.props['title']} active={true} />
                    {/*<Menu.Item name='data'  />*/}


                    <Menu.Menu position='right' >
                        <Menu.Item>
                            <Loader active inline />
                        </Menu.Item>
                        {/*<Button size={'mini'}>*/}
                            {/*<Loader active inline />*/}
                        {/*</Button>*/}

                        {/*<div className='ui right aligned category search item'>*/}
                            {/*<div className='ui transparent icon input'>*/}
                                {/*<input className='prompt' type='text' placeholder='Search animals...' />*/}
                                {/*<i className='search link icon' />*/}
                            {/*</div>*/}
                            {/*<div className='results' />*/}
                        {/*</div>*/}
                    </Menu.Menu>
                </Menu>
                <div className='ui bottom attached' style={{height:'calc(100% - 40px)'}}>
                    <ParentSize>
                        {parent=>{
                            return <BaseComponent {...parent} {...this.props} />
                        }}
                    </ParentSize>
                </div>

            </React.Fragment>
        }
    }

    return WrappedComponent;
}

