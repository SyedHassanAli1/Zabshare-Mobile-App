import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Container, Content} from 'native-base';

const TermsCondition = ({navigation}) => {
  return (
    <Container>
      <Content style={styles.viewcont}>
        <View>
          <Text style={styles.txtcont}>Terms & Conditions</Text>

          <Text style={styles.txtcont3}>
            Our contacts: zabshare100@gmail.com
          </Text>

          <Text style={styles.txtcont1}>General terms</Text>

          <Text style={styles.txtcont2}>
            Please read this Terms of Use Agreement (these “Terms”) carefully
            before using the ZabShare mobile app (the “App”). Your use of the
            App constitutes acceptance of these Terms and forms a legally
            binding contract between you and ZabShare.
          </Text>

          <Text style={styles.txtcont2}>
            If you do not agree to these Terms, immediately discontinue using
            the App.
          </Text>
          <Text style={styles.txtcont2}>
            The Company may change these Terms, at any time, without prior
            notice to you, by posting a new version. The latest version will
            become effective on the date it is posted, which will be listed at
            the top of the Terms as the Effective Date. It is your
            responsibility to review these Terms. Your continued use of the App
            after the Effective Date is your acceptance of the new Terms. If you
            do not agree to the revised Terms, you must immediately discontinue
            using the App.
          </Text>

          <Text style={styles.txtcont2}>
            The services the App provides may be temporarily unavailable from
            time to time for maintenance or other reasons. The Company assumes
            no responsibility for any error, omission, interruption, deletion,
            defect, delay in operation or transmission, communications line
            failure, theft or destruction or unauthorized access to, or
            alteration of, User communications. The Company is not responsible
            for any technical malfunction or other problems of any telephone
            network or service, computer systems, servers, or providers,
            computer or mobile phone equipment, software, failure of email or
            players on account of technical problems or traffic congestion on
            the Internet, on the App, or any website or any combination thereof,
            including injury or damage to User’s mobile device related to or
            resulting from using or downloading the App and/or in connection
            with the services provided by the App.
          </Text>

          <Text style={styles.txtcont1}>Use and Restrictions</Text>

          <Text style={styles.txtcont2}>
            Subject to these Terms, you may use the App only for your personal
            use.
          </Text>
          <Text style={styles.txtcont2}>
            You are expressly prohibited from the following:
          </Text>

          <Text style={styles.txtcont2}>
            1. Taking any action that will cause an unreasonable burden on the
            Company’s infrastructure;
          </Text>

          <Text style={styles.txtcont2}>
            2. Attempting to access or navigate the content through any manner
            other than the App;
          </Text>

          <Text style={styles.txtcont2}>
            3. Reverse engineering, disassembling, modifying, adapting, or
            otherwise attempting to derive the source code, algorithms, or other
            trade secrets of the Company;
          </Text>

          <Text style={styles.txtcont2}>
            4. Attempting to exploit any possible vulnerability in the App or
            overloading, “flooding,” “spamming,” “crashing,” or otherwise
            attempting to interfere with the Company’s service to others;
          </Text>

          <Text style={styles.txtcont2}>
            5. Attempting to inject a virus, worm, or other malware into the
            App;
          </Text>

          <Text style={styles.txtcont2}>
            6. Removing, circumventing, disabling, damaging, or otherwise
            interfering with security-related features of the App, features that
            prevent or restrict the use of copying of any content accessible
            through the App, or features that enforce limitations on the use of
            the App; or
          </Text>

          <Text style={styles.txtcont2}>
            7. Mining the content or performing any other data gathering or
            extraction.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.buttonOutline}>
              <Text style={styles.buttonOutlineText}>Accepted</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default TermsCondition;

const styles = StyleSheet.create({
  viewcont: {
    flex: 1,
  },

  txtcont: {
    fontSize: 16,
    textAlign: 'center',
    margin: 5,
    fontWeight: '700',
    color: '#595958',
  },

  txtcont1: {
    fontSize: 16,
    textAlign: 'left',
    margin: 10,
    fontWeight: '900',
    justifyContent: 'center',
    marginBottom: 1,
    lineHeight: 20,
    color: '#595958',
  },

  txtcont2: {
    fontSize: 12,
    textAlign: 'left',
    margin: 10,
    fontWeight: '600',
    justifyContent: 'center',
    marginBottom: 1,
    lineHeight: 20,
    color: '#595958',
  },

  txtcont3: {
    fontSize: 16,
    textAlign: 'left',
    margin: 10,
    fontWeight: '900',
    justifyContent: 'center',
    marginBottom: 1,
    lineHeight: 20,
    color: '#595958',
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonOutline: {
    backgroundColor: 'white',
    height: 50,
    width: 150,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 1,

    shadowColor: 'rgba(0,0,0, .2)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },

  buttonText: {
    color: 'white',
    fontWeight: '100',
    fontSize: 11,
  },

  buttonOutlineText: {
    color: '#0c54a3',
    fontWeight: '500',
    fontSize: 14,
  },
});
