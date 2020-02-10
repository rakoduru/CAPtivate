import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import SidebarComponent from './components/sidebar/SidebarComponent';
import HeaderComponent from './components/header/HeaderComponent';
import ContentComponent from './components/content/ContentComponent';
import { getUser, removeUserSession, getToken } from './Utils/Common';

import './App.css';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        minHeight: '100vh'
    },
    content: {
        marginTop: 54
    },
    mainBlock: {
        backgroundColor: '#F7F8FC',
        padding: 30
    }
});
function Dashboard(props) {
  const user = getUser();
  const token =getToken();
  //harcoded to a known username to test signin
  if(token == 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTgxMzIzMDIzLCJleHAiOjE1ODE5Mjc4MjN9.jli89nUrp70wCDA4AwxG1VnWO0WzLFrA4dx7gDYBZ_X3MSU5tr42WvEAoMoiuAShAt8OFUI6ABcGnjSSZZkc9A' ){
    return <div className="content">Sucessfull...!!</div>
  }
  else{
    return <div className="content">Failed...!!</div>
  }

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }
  return (
    <div>
      //Welcome {user.name}!<br /><br />
      Welcome signed in successfully!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

class App extends React.Component {

    state = { selectedItem: 'Overview' };

    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => this.forceUpdate();

    render() {
        const { selectedItem } = this.state;
        return (
            <Row className={css(styles.container)}>
                <SidebarComponent selectedItem={selectedItem} onChange={(selectedItem) => this.setState({ selectedItem })} />
                <Column flexGrow={1} className={css(styles.mainBlock)}>
                    <HeaderComponent title={selectedItem} />
                    <div className={css(styles.content)}>
                        <ContentComponent />
                    </div>
                </Column>
            </Row>
        );
    }
}

export default App;
