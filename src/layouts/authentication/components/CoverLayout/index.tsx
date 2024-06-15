/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
// @mui material components
import Grid from '@mui/material/Grid';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
// import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DefaultNavbar from 'examples/Navbars/DefaultNavbar';
import PageLayout from 'examples/LayoutContainers/PageLayout';

// Authentication layout components
import Footer from 'layouts/authentication/components/Footer';

interface CoverLayoutProps {
  coverHeight?: string;
  image: string;
  children: React.ReactNode;
}

function CoverLayout({ coverHeight = '35vh', image, children }: CoverLayoutProps) {
  return (
    <PageLayout>
      <DefaultNavbar
        action={{
          type: 'external',
          route: 'https://creative-tim.com/product/material-dashboard-react',
          label: 'free download',
        }}
        transparent
        light
      />
      <MDBox
        width='calc(100% - 2rem)'
        minHeight={coverHeight}
        borderRadius='xl'
        mx={2}
        my={2}
        pt={6}
        pb={28}
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.4),
              rgba(gradients.dark.state, 0.4)
            )}, url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <MDBox mt={{ xs: -20, lg: -18 }} px={1} width='calc(100% - 2rem)' mx='auto'>
        <Grid container spacing={1} justifyContent='center'>
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </PageLayout>
  );
}

export default CoverLayout;
