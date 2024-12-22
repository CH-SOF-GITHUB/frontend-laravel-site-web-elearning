import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../blogs/shared-theme/AppTheme';
import MainContent from '../blogs/MainContent';
import Latest from '../blogs/Latest';


export default function Blog(props) {
  return (
    <AppTheme
     {...props}>
      <CssBaseline enableColorScheme />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent />
        <Latest />
      </Container>
    </AppTheme>
  );
}