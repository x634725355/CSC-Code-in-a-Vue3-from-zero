pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'npm -v'
                sh 'npm i'
                echo 'download done'
                sh 'npm run build-v'
                echo 'build done'
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
                sh 'cp -r ./dist /var/www/html/csc'
                echo 'copy done'
            }
        }
    }
}