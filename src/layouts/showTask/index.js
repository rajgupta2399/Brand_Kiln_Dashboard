import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import TaskFilters from "./components/TaskFilter";

const ShowTask = () => {
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="primary"
                  borderRadius="lg"
                  coloredShadow="primary"
                >
                  <MDTypography variant="h5" color="white" align="center">
                    Manage Your Tasks
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} px={3}>
                  <SearchBar />
                  <TaskFilters />
                  <TaskList />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </>
  );
};

export default ShowTask;
