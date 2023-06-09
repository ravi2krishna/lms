pipeline {
    agent any
    //environment {
    //Use Pipeline Utility Steps plugin to read information from pom.xml into env variables
    // IMAGE = readMavenPom().getArtifactId()
    // VERSION = readMavenPom().getVersion()
    //}

    stages {
        stage('Sonar Analysis') 
        {
            steps 
            {
                echo 'Testing..'
                
            }
        }

        stage('Build LMS') {
            steps {
                
        }

        stage('Release LMS') {
            steps {
                script {
               
               }    
            }
        }

        stage('Deploy LMS') {
            steps {
                echo 'Deploying....'
                script {
                
               }                    
            }
        }
    }
}