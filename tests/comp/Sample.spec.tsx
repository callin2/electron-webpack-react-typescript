import * as React from 'react';

import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

//======================== test target ====================
import SecondPage from '../../src/renderer/page/second';
//=========================================================

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const actions = {
        increment: spy(),
        incrementIfOdd: spy(),
        incrementAsync: spy(),
        decrement: spy()
    };
    // const component = shallow(<SecondPage counter={1} {...actions} />);
    const component = Enzyme.shallow(<SecondPage/>);

    return {
        component,
        actions,
        buttons: component.find('button'),
        p: component.find('.counter')
    };
}


describe('Counter component', () => {
    it('should should display count', () => {
        const { p } = setup();
        expect(p.text()).toMatch(/^1$/);
    });

    it('should first button should call increment', () => {
        const { buttons, actions } = setup();
        buttons.at(0).simulate('click');
        expect(actions.increment.called).toBe(true);
    });

    it('should match exact snapshot', () => {
        const { actions } = setup();
        const tree = renderer
            .create(
                <div>
                    <Router>
                        <SecondPage/>
                    </Router>
                </div>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should second button should call decrement', () => {
        const { buttons, actions } = setup();
        buttons.at(1).simulate('click');
        expect(actions.decrement.called).toBe(true);
    });

    it('should third button should call incrementIfOdd', () => {
        const { buttons, actions } = setup();
        buttons.at(2).simulate('click');
        expect(actions.incrementIfOdd.called).toBe(true);
    });

    it('should fourth button should call incrementAsync', () => {
        const { buttons, actions } = setup();
        buttons.at(3).simulate('click');
        expect(actions.incrementAsync.called).toBe(true);
    });
});