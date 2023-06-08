pipeline {
    agent any 

    stages {
        stage('Test') { 
            steps {
                echo 'sonar analysis..'
                sh 'npm -v'
  }
        }
        stage('Build & release') { 
            steps {
                echo 'building..'
            }
        }
        stage('Deploy') { 
            steps {
                echo 'Deploying..'
            }
        }
    }
}