import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View, ImageBackground, StatusBar, Image, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import axios from 'axios';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';

interface IBGEUFResponse {
  id: number;
  sigla: string;
}

interface IBGECityResponse {
  id: number;
  nome: string;
}

const Home = () => {
  const [UFs, setUFs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUF, setSelectedUF] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUFs = async () => {
      const { data } = await axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      const UFs_list = data.map(uf => uf.sigla);
      setUFs(UFs_list);
    }
    fetchUFs();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      const { data } = await axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`);
      const cities_names = data.map(city => city.nome);
      setCities(cities_names);
    }
    fetchCities();
  }, [selectedUF]);

  function handleNavigationToPoints() {
    navigation.navigate('Points', {
      selectedUF,
      setSelectedCity,
    });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        source={require('../../assets/img/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/img/logo.png')} />
          <View>
            <Text style={styles.title}>Your Marketplace of residues collection</Text>
            <Text style={styles.description}>We help people find residue collection points efficiently</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Picker
            selectedValue={selectedUF}
            style={styles.input}
            onValueChange={(uf, _) => (uf.toString().length > 2) ? '' : setSelectedUF(uf.toString())}>
            <Picker.Item label={'Select an UF'} value={'Select an UF'} />
            {UFs.map(UF => (
              <Picker.Item key={UF} label={UF} value={UF} />
            ))}
          </Picker>
          <Picker
            selectedValue={selectedCity}
            style={styles.input}
            onValueChange={(city, _) => { city.toString() !== 'Select a City' ? setSelectedCity(city.toString()) : null}}>
            <Picker.Item label={'Select a City'} value={'Select a City'} />
            {cities.map(city => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
          <RectButton style={styles.button} onPress={handleNavigationToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" size={24} color="#FFF" />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Access
          </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu-Bold',
    maxWidth: 300,
    marginTop: 48,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto-Regular',
    maxWidth: 320,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  }
});

export default Home;