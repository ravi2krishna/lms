pipeline {
    agent any
    //environment {
    //Use Pipeline Utility Steps plugin to read information from pom.xml into env variables
    // IMAGE = readMavenPom().getArtifactId()
    // VERSION = readMavenPom().getVersion()
    //}

    stages {
        stage('Sonar Analysis') {
            steps {
                echo 'Testing..'
                //sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://13.92.5.110:9000" -e SONAR_LOGIN="sqp_cab9202255bd4cf50f3dbba65bb5aaef79ed00fa"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
            }
        }

        stage('Build LMS') {
            steps {
                echo 'Building Artifacts..'
                //sh 'cd webapp && npm install && npm run build'
            }
        }

        stage('Release LMS') {
            steps {
                script {
                def packageJSON = readJSON file: 'webapp/package.json'
                def packageJSONVersion = packageJSON.version
                echo "${packageJSONVersion}"
                sh 'echo ${packageJSONVersion}'
                sh 'zip dist-\"${packageJSONVersion}.zip\" -r webapp/dist'
                sh 'ls webapp'                  
                   //def data = readFile(file: 'webapp/package.json')
                   //println(data)
                echo 'Store Artifacts....'
                //sh 'cd webapp && zip dist-${packageJSONVersion}.zip -r dist'
                //sh 'cd webapp && curl -v -u admin:Admin123* --upload-file dist-${packageJSONVersion}.zip http://13.92.5.110:8081/repository/lms/'
               }
                
            }
        }

        stage('Deploy LMS') {
            steps {
                echo 'Deploying....'
                //sh 'sudo rm -rf /var/www/html/*'
                //sh 'curl -u admin:Admin123* -X GET \'http://13.92.5.110:8081/repository/lms/dist-${packageJSONVersion}.zip\' --output dist.zip'
                //sh 'unzip dist.zip && sudo cp -r dist/* /var/www/html/'
            }
        }
    }
}