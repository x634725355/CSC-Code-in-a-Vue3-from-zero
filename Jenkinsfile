pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'pnpm i'
                echo 'download done'
                sh 'pnpm run build-v'
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
                cp -r ./dist /var/www/html/csc
                echo 'copy done'
            }
        }
    }
}