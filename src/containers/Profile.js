import React, {Component} from 'react'
import {Container, Name, GameListHeader, GameList, GameRecord, Column, ColumnLabels} from '../styled/Profile'
import Relay from 'react-relay'

class Profile extends Component {

  // automatically called when component loads
  get records() {
    return this.props.viewer.user.p1games.edges.map( (edge,index) => {
      let {node: game} = edge
      return (
        <GameRecord
          key={index}
          index={index}
        >
          <Column>
            {(game.winner) ? 'Won!' : "Didn't win"}
          </Column>
          <Column>
            {game.p1Guess}
          </Column>
          <Column>
            {(game.p1GuessCorrect) ? 'Yes' : 'Nope'}
          </Column>
          <Column>
            {new Date(game.createdAt).toLocaleDateString()}
          </Column>
        </GameRecord>
      )
    })
  }

  render() {
    let {email} = this.props.viewer.user
    console.log('user', this.props.viewer.user)

    return (
      <Container>
        <Name>
          {email}
        </Name>
        <GameList>
          <GameListHeader>
            MyGames
          </GameListHeader>
          <ColumnLabels>
            <Column>
              Outcome
            </Column>
            <Column>
              Guess
            </Column>
            <Column>
              Guessed Correctly
            </Column>
            <Column>
              Date
            </Column>
          </ColumnLabels>
          {this.records}
        </GameList>
      </Container>
    )
  }
}

// args:
// 1) component to be attached
// 2) obj to specifiy which fragments to be provided to Template
export default Relay.createContainer(
  Profile, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          user {
            id
            email
            p1games (first: 10) {
              edges {
                node {
                  id
                  createdAt
                  winner {
                    id
                  }
                  p1Guess
                  p1GuessCorrect
                }
              }
            }
          }
        }
      `,
    }
  }
)