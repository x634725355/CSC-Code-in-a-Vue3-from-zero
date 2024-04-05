pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                nodejs('v21.7.2') {
                    sh 'yarn install'
                    sh 'yarn build'
                }
                echo 'download done'
                nodejs('v21.7.2') {
                    sh 'pnpm run build-v'
                }
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