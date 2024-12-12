import * as React from 'react';
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Divider,
  Stack,
  Card as MuiCard,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  auth,
  googleProvider,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from '../firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { isSignInWithEmailLink } from 'firebase/auth';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export default function SignIn(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLinkSent, setIsLinkSent] = React.useState(false);
  const navigate = useNavigate();

  // const actionCodeSettings = {
  //   url: 'http://localhost:3001',
  //   handleCodeInApp: true,
  // };

  const actionCodeSettings = {
    url: process.env.REACT_APP_MAGIC_LINK_URL,
    handleCodeInApp: process.env.REACT_APP_HANDLE_CODE_IN_APP === 'true',

  }
console.log('actionCodeSettings', actionCodeSettings);

  const handleEmailPasswordSignIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Successfully signed in!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      console.error('Error signing in:', err);
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      alert(`Welcome, ${result.user.displayName}`);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      console.error('Error with Google Sign-In:', err);
    }
  };

  // Send Magic Link
  const handleSendMagicLink = async () => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      alert('Magic link sent to your email!');
      setIsLinkSent(true);
      window.localStorage.setItem('emailForSignIn', email);
    } catch (err) {
      setError(err.message);
      console.error('Error sending magic link:', err);
    }
  };

  // Verify Magic Link
  React.useEffect(() => {
    const verifyMagicLink = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        const storedEmail = window.localStorage.getItem('emailForSignIn');
        if (!storedEmail) {
          setError('No email stored for verification.');
          return;
        }
        try {
          await signInWithEmailLink(auth, storedEmail, window.location.href);
          alert('Successfully signed in with magic link!');
          window.localStorage.removeItem('emailForSignIn');
          navigate('/dashboard');
        } catch (err) {
          setError(err.message);
          console.error('Error verifying magic link:', err);
        }
      }
    };
    verifyMagicLink();
  }, [navigate]);

  return (
    <Box sx={{ width: '100%' }}>
      <CssBaseline />
      <SignInContainer>
        <Card variant="outlined">
          <Typography component="h1" variant="h4">
            Sign In
          </Typography>

          {/* Email/Password Sign-In Form */}
          <Box
            component="form"
            onSubmit={handleEmailPasswordSignIn}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel>Email</FormLabel>
              <TextField
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <TextField
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </FormControl>
            <Button type="submit" variant="contained">
              Sign In with Email
            </Button>
          </Box>

          <Divider>or</Divider>

          {/* Magic Link Sign-In */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <TextField
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
            </FormControl>
            <Button
              variant="outlined"
              onClick={handleSendMagicLink}
              disabled={!email}
            >
              Send Magic Link
            </Button>
            {isLinkSent && (
              <Typography color="success.main">
                Magic link sent! Check your email.
              </Typography>
            )}
          </Box>

          <Divider>or</Divider>

          {/* Google Sign-In */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button variant="outlined" onClick={handleGoogleSignIn}>
              Continue with Google
            </Button>
          </Box>

          {error && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}
        </Card>
      </SignInContainer>
    </Box>
  );
}