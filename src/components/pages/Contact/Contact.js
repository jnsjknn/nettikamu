import React, { useState } from 'react';
import classes from './Contact.module.css';
import Card from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { connect } from 'react-redux';
import { sendBugReport } from '../../../actions/posts';
import PropTypes from 'prop-types';

const Contact = ({ sendBugReport }) => {
  const [text, updateText] = useState('');
  const [reason, updateReason] = useState('');

  return (
    <Card>
      <form
        onSubmit={e => {
          e.preventDefault();
          sendBugReport(text);
        }}
        className={classes.Contact}
      >
        <h1>Ota yhteyttä</h1>
        <label htmlFor="reason">Yhteydenoton syy</label>
        <Input
          type="dropdown"
          id="reason"
          name="reason"
          onChange={e => updateReason(e.target.value)}
          value={reason}
          options={['virheilmoitus', 'palaute', 'kysymys', 'muu']}
        />
        {reason === 'Virheilmoitus' && (
          <p style={{ fontSize: '12px', margin: '5px 5px 10px 5px' }}>
            Kirjoita alle mahdollisimman tarkka kuvaus kohtaamastasi virheestä
            sivustolla, niin pyrimme korjaamaan sen mahdollisimman pian. Kerro
            myös millä laitteella ja internetselaimella kohtasit ongelman.
            Ilmoitus lähetetään anomyyminä, mutta voit halutessasi jättää myös
            yhteystietosi mahdollisia lisäkysymyksiä varten.
          </p>
        )}
        {reason === 'Palaute' && (
          <p style={{ fontSize: '12px', margin: '5px 5px 10px 5px' }}>
            Kirjoita palautteesi alle. Palaute lähetetään anomyyminä, mutta voit
            halutessasi jättää myös yhteystietosi mahdollisia lisäkysymyksiä
            varten.
          </p>
        )}
        {reason === 'Kysymys' && (
          <p style={{ fontSize: '12px', margin: '5px 5px 10px 5px' }}>
            Kirjoita kysymyksesi alle. Muista jättää myös yhteystietosi, jotta
            voimme vastata kysymykseesi.
          </p>
        )}
        <Input
          type="textarea"
          rows="5"
          cols="50"
          style={{ height: '250px' }}
          placeholder="Kirjoita tähän.."
          value={text}
          onChange={e => updateText(e.target.value)}
        />
        <Button type="submit">Lähetä</Button>
      </form>
    </Card>
  );
};

Contact.propTypes = {
  sendBugReport: PropTypes.func
};

export default connect(null, { sendBugReport })(Contact);
