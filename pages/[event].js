import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
// var array = require('lodash/array');
import _ from "lodash";
import { getEventMeta, getEventByUrl, fetchAPI } from "../lib/api";
import { Grid, Button } from "@material-ui/core";

import Meta from "components/globals/Meta";
import Page from "../components/template1/Page";
import Header from "../components/template1/Header";
import Navbar from "../components/template1/Navbar";
import Body from "../components/template1/Body";
import VideoBox from "../components/template1/VideoBox";
import Sidebar from "../components/template1/Sidebar";
import Banner from "../components/template1/Banner";
import Hero from "../components/template1/Hero";
import Footer from "../components/template1/Footer";

import ListItem from "../components/template1/ListItem";
import Section from "../components/template1/Section";
import ListItemSmall from "../components/template1/ListItemSmall";
import EventSearch from "../components/template1/EventSearch";

export const event_theme = {
  // bg: '#BADA55'
  fontFamily: "Roboto",
};

//check if authorization is necessary

//if necessary, provide a workflow for sign in or sign up

//check if this person is authorized to see this page

const Template1 = (props) => {
  const [isPreview, setPreview] = useState(
    props.meta.eventStatus.EventStatus === "Preview"
  );

  const router = useRouter();
  const [hasStarted, setStarted] = useState(false);
  const [sidbarState, toggleSidebar] = useState(null);
  let event_meta = props.meta;

  const the_start =
    Date.parse(event_meta.eventJobStartEnd?.StartDateTime) || Date.now();

  let isAuthenticated = props.context.previewData.isAuthenticatedTEST;

  useEffect(() => {
    if (isAuthenticated || process.env.NODE_ENV === "development") {
      setPreview(false);
    }
  }, []);

  useEffect(() => {
    let now = Date.now();
    console.log("now: " + now);
    let dateStart = the_start - 18000000;
    console.log("start: " + dateStart);
    if (dateStart < now) {
      setStarted(true);
    }
  }, []);

  if (!isPreview) {
    return (
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        <Header theme={event_theme}>
          <Navbar info={event_meta} />
        </Header>
        <Hero
          hasStarted={hasStarted}
          title={event_meta.EventJobName}
          bgImage="http://lorempixel.com/1500/500/"
          start={event_meta.events.filter((event) => event.isMainEvent == true)}
        />
        <Body>
          <Section>
            <Grid container={true} spacing={3}>
              <Grid item={true} md={9} sm={12}>
                <VideoBox isStarted={hasStarted} />
              </Grid>
              <Grid item={true} md={3} sm={12}>
                <Sidebar theme={event_theme} />
              </Grid>
            </Grid>
          </Section>

          <Banner color="#181818"></Banner>

          <Section showButton={true} title="Speakers">
            <Grid container={true} spacing={3} justify={"center"}>
              <ListItem md={4} timeout={500} />
              <ListItem md={4} timeout={1000} />
              <ListItem md={4} timeout={2000} />
            </Grid>
          </Section>
          <Section showButton={true} title="Platinum Sponsors">
            <Grid container={true} spacing={3} justify={"center"}></Grid>
          </Section>
          <Section showButton={true} title="Gold Sponsors">
            <Grid container={true} spacing={3} justify={"center"}>
              <Grid item={true} md={4}>
                <img src="http://lorempixel.com/350/250/"></img>
              </Grid>

              <Grid item={true} md={4}>
                <img src="http://lorempixel.com/350/240/"></img>
              </Grid>

              <Grid item={true} md={4}>
                <img src="http://lorempixel.com/350/220/"></img>
              </Grid>
            </Grid>
          </Section>
          <Section
            showButton={false}
            title={`${event_meta.EventJobName} in the News`}
          >
            <Grid container={true} spacing={3} justify={"center"}>
              <ListItemSmall />
              <ListItemSmall />
              <ListItemSmall />
            </Grid>
          </Section>

          <EventSearch
            currenthref={event_meta.eventUrl}
            events={event_meta.events}
          />

          <Section></Section>
        </Body>
        <Footer>
          <div></div>
          <div className="signoff">
            <center>Copyright 2020 Mill James</center>
          </div>
          <div></div>
        </Footer>
        {/*           
        <h3>path: {router.pathname} </h3>

       <ul>
          {_.keys(event_meta.events).map((event) => {
            const info = event_meta.events[event];
            return (
              <li key={info.id}>
                <Link key={info.id} href={`${router.pathname}/${info.slug}`}>
                  {info.EventName}
                </Link>
              </li>
            );
          })}
        </ul> */}
      </Page>
    );
  } else {
    return <h1> Error </h1>;
  }
};
export async function getStaticPaths() {
  const { eventJobs } = await fetchAPI(`
  query{
    eventJobs{
      eventUrl
    }
  }
  `);

  const paths = [];

  eventJobs.forEach((job) => {
    paths.push({ params: { event: job.eventUrl } });
  });
  console.log(paths);
  return {
    paths: paths,
    fallback: false,
  };
}
export async function getStaticProps(ctx) {
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.

  //get the event job data from our api
  let url;
  !ctx.previewData ? (url = Router.pathname) : (url = ctx.previewData.url);

  const eventData = await getEventMeta(ctx.params.event);

  //this is what will load as the "context" if we haven't come here through
  //our preview link
  const noctx = {
    preview: eventData.eventStatus.EventStatus === "Preview",
    previewData: {
      isAuthenticatedTEST: false,
    },
  };
  //set the context object to whatever our api is saying

  if (!ctx.preview) {
    ctx = noctx;
  }
  const values = {
    props: {
      context: ctx,
      //meta will be the props for the event
      meta: eventData,
    },
  };
  return values;
}

export default Template1;