import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
const arcBlue = '#00d1b2'
const arcOrange = '#FFBA60'
const theme = createMuiTheme({
  palette: {
    common: {
      blue: arcBlue
    },
    primary: {
      main: arcBlue
    },
    secondary: {
      main: arcOrange
    },
  },
  status: {
    danger: 'orange',
  },
  typography: {
    h3: {
      fontWeight: 300
    },
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
    },
    estimate: {
      fontFamily: 'Pacifico',
      fontSize: '1rem',
      textTransform: 'none',
      color: 'white'
    }
  }
});
export default theme