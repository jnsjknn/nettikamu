import React, { useState } from 'react';
import Card from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { connect } from 'react-redux';
import { sendBugReport } from '../../../actions/posts';

const ReportIssue = ({ sendBugReport }) => {
  const [text, updateText] = useState('');

  return (
    <Card>
      {' '}
      <form
        onSubmit={e => {
          e.preventDefault();
          sendBugReport(text);
        }}
      >
        <h3>Ilmoita ongelmasta</h3>
        <p style={{ fontSize: '12px', marginBottom: '10px' }}>
          Kirjoita alle mahdollisimman tarkka kuvaus kohtaamastasi ongelmasta
          sivustolla, niin pyrin korjaamaan sen mahdollisimman pian. Kerro myös
          millä laitteella ja internetselaimella kohtasit ongelman. Voit
          halutessasi jättää myös yhteystietosi lisäkysymyksiä varten.
        </p>
        <p style={{ fontSize: '12px' }}>
          Poistan tähän lomakkeeseen kirjoittamasi tiedot tietokannasta heti,
          kun olen lukenut ilmoituksesi.
        </p>
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

export default connect(null, { sendBugReport })(ReportIssue);
