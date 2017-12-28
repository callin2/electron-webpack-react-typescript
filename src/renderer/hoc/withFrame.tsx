import * as React from 'react';
import { Header, Icon } from 'semantic-ui-react'
import { ParentSize } from '@vx/responsive';

export default function withFrame(BaseComponent) {
    class WrappedComponent extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return <React.Fragment>
                <Header size='small' attached='top' color='red' inverted>
                    Attached Header
                </Header>
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

