pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'ls'
                sh 'cd webapp'
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
