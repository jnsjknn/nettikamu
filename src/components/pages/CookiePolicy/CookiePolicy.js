import React, { useEffect } from 'react';
import classes from './CookiePolicy.module.css';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import scrollToTop from '../../../utils/scrollToTop';
const CookiePolicy = ({ history }) => {
  useEffect(() => {
    scrollToTop();
  });
  return (
    <Card style={{ marginTop: '65px' }}>
      <Button onClick={() => history.goBack()}>
        Takaisin edelliselle sivulle
      </Button>
      <div className={classes.CookiePolicy}>
        <h1>Evästekäytäntö</h1>
        <p>
          <i>Laadittu 1.2.2021</i>
        </p>

        <h3>Evästeet tällä sivustolla</h3>
        <p>
          Eväste on pieni tekstitiedosto, joka tallennetaan käyttäjän
          tietokoneelle, kun hän vierailee sivustossa. Evästeet ovat
          turvallisia: ne eivät sisällä henkilötietoja eikä niiden avulla voida
          suorittaa ohjelmia tai tallentaa viruksia käyttäjän tietokoneelle.
        </p>
        <p>
          Käytämme evästeitä tässä sivustossa kirjautumistoiminnon
          mahdollistamiseen, käyttäjän valitseman sivuston ulkoasu-asetuksen
          tallentamiseen sekä mainonnan kohdentamiseen.
        </p>

        <p>
          <strong>Kirjautumistoiminto</strong>
        </p>
        <p>
          Kirjautuessasi sisään tälle sivustolle, sivusto lähettää
          käyttäjänimesi ja salasanasi palvelimelle. Palvelin varmistaa, että
          kirjautumistiedot ovat oikeat ja lähettää vastauksena pitkän numeroita
          ja kirjaimia sisältämän kirjautumispoletin (token). Poletti
          tallennetaan tietokoneellesi evästeenä ja lähetetään jatkossa takaisin
          palvelimelle aina, kun yrität selata sisältöä, joka vaatii sivustolle
          kirjautumista. Palvelin tarkistaa, että poletti on pätevä ja lähettää
          tietokoneellesi sisällön, jota yritit selata. Poletin avulla voidaan
          välttää jatkuva käyttäjätunnuksen ja salasanan pyytäminen.
        </p>
        <p>
          <strong>Ulkoasuasetuksen tallentaminen</strong>
        </p>
        <p>
          Sivuston ulkoasuun on saatavilla vaalea ja tumma teema.
          Teemamieltymyksesi tallennetaan tietokoneellesi evästeenä, jolloin
          sivuston ulkoasu voidaan jatkossa automaattisesti muuttaa sellaiseksi
          kuin itse haluat, eikä asetusta tarvitse muuttaa jokaisen
          kirjautumisen yhteydessä
        </p>
        <p>
          <strong>Mainosten kohdentaminen</strong>
        </p>
        <p>
          Nettisivun ylläpito vaatii paljon aikaa ja osa sen
          toiminnallisuuksista kuten nettikamu.fi -verkkotunnuksen hallinta,
          sivuston isännöinti palvelimella sekä turvallisen HTTPS-yhteyden
          mahdollistaminen ovat maksullisia. Tästä syystä sivustolle on asetettu
          pieni määrä mainospaikkoja, joiden avulla sivusto voi tuottaa rahaa.
        </p>
        <p>
          Mainosten toimittamiseen käytetään Googlen AdSense palvelua, joka
          käyttää evästeitä mainosten kohdentamiseen oman{' '}
          <a
            href="https://support.google.com/adsense/answer/7549925?hl=fi"
            target="_blank"
            rel="noreferrer"
          >
            evästekäytäntönsä
          </a>{' '}
          mukaisesti.
        </p>

        <h3>Evästeiden käytön estäminen</h3>
        <p>
          Jos haluat estää evästeet, muuta selaimesi evästeasetuksia.
          Lisätietoja evästeiden hallinnasta selaimessasi on osoitteessa{' '}
          <a href="https://aboutcookies.org" target="_blank" rel="noreferrer">
            https://aboutcookies.org
          </a>
        </p>
        <p>
          Jos estät evästeiden käytön selaimessasi, laitettasi ei seurata, kun
          vierailet sivustossa. Evästeiden käytön estäminen estää nettikamuun
          kirjautumisen.
        </p>
      </div>
      <Button onClick={() => history.goBack()}>
        Takaisin edelliselle sivulle
      </Button>
    </Card>
  );
};

export default CookiePolicy;
