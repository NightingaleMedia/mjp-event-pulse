import React, { useEffect, useState } from 'react';
import { event_theme } from '../index';
import { useRouter } from 'next/router';
import Body from '../../../components/template1/Body';
import Section from '../../../components/template1/Section';
import Meta from 'components/globals/Meta';
import { getExhibitorMeta } from '../../../lib/api';
import { DropzoneArea } from 'material-ui-dropzone';
import Dropzone from 'react-dropzone-uploader';
import Page from '../../../components/template1/Page';
import Uploader from '../../../components/globals/Uploader';

import styled from 'styled-components';
import {
  Button,
  Paper,
  Snackbar,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const ExhibitorForm = styled(Paper)`
  && {
    font-size: 18px;
    display: block;
    cursor: pointer;
    margin-bottom: 10px;
    border: 1px solid #c4c4c4;
    border-radius: 7px;
    height: 100px;
    padding: 20px;
    transition: all 0.15s;
    opacity: 1;
  }
  span {
    color: black;
    font-weight: 800;
  }
  &&.submitting {
    background-color: #e2e2e2;
    opacity: 0.5;
  }
`;
const ExhibitorUpload = ({ data }) => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    inputs: {},
    submitting: false,
    submitted: false,
  });

  return (
    <Page theme={event_theme}>
      <Meta title="Exhibitors"> </Meta>
      <Body>
        <Section>
          {form.submitted ? (
            <Paper
              style={{
                width: '50%',
                margin: 'auto',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <h2>
                Thank you!
                <br /> Your presentation has been uploaded
              </h2>
            </Paper>
          ) : (
            <>
              <center>
                <h1>Exhibitor Sign Up</h1>
              </center>
              <ExhibitorForm
                className={form.submitting ? 'submitting' : ''}
                style={{
                  width: '80%',
                  margin: 'auto',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <label>
                  Video file for{' '}
                  <strong>
                    {' '}
                    {data.FirstName} {data.LastName}
                  </strong>
                </label>
                <br />
                <Uploader
                  index="videoLink"
                  fileName="info"
                  url={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/exhibitors/${router.query.id}/upload`}
                />
              </ExhibitorForm>
            </>
          )}
        </Section>
      </Body>
    </Page>
  );
};

export async function getServerSideProps(ctx) {
  const id = ctx.query.id || null;
  let data;

  data = await getExhibitorMeta(`${id.slice(0, 3)}`);

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default ExhibitorUpload;
