pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh '${env.pnpm} -v'
                sh '${env.pnpm} i'
                echo 'download done'
                sh '${env.pnpm} run build-v'
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