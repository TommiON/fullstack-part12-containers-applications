import styled, { css } from 'styled-components'

const StandardButton = styled.button`
  background: "bisque";
  color: "black";
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const MoveSetButton = styled.button`
  background: "bisque";
  color: "black";
  font-size: 1em;
  margin: 1em;
  padding: 0px;
  border: 2px solid Chocolate;
  border-radius: 3px;
  width: 36px;
  height: 36px;

  ${props => 
    props.emptySet &&
    css`
        background: Gainsboro;
        color: Black;
        border: 2px solid Gray;
    `
  }

  ${props => 
    props.fullSet &&
    css`
        background: SpringGreen;
        color: Black;
        border: 2px solid Green;
    `
  }

  ${props => 
    props.partialSet &&
    css`
        background: LightCoral;
        color: Black;
        border: 2px solid Red;
    `
  }

  ${props => 
    props.passiveSet &&
    css`
        background: SteelBlue;
        color: Black;
        border: 2px solid SteelBlue;
    `
  }
`

export { StandardButton, MoveSetButton }