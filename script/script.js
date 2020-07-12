window.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line strict
    'use strict';

    // Timer
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');


        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000;

            let seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 3600);

            if (seconds <= 9) { seconds = '0' + seconds; }
            if (minutes <= 9) { minutes = '0' + minutes; }
            if (hours <= 9) { hours = '0' + hours; }

            return { seconds, minutes, hours, timeRemaining };
        }

        function updateClock() {
            const timer = getTimeRemaining();
            if (timer.timeRemaining < 0) {
                timer.hours = '00';
                timer.minutes = '00';
                timer.seconds = '00';
            }

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            return timer.timeRemaining;
        }

        function launchClock() {
            const interval = setInterval(() => {
                const time = updateClock();
                if (time < 0) { clearInterval(interval); }
            }, 1000);
        }

        launchClock();
    }

    countTimer('13 july 2020');

    // menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);

        menu.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.close-btn');

            if (target || !target) {
                menu.classList.toggle('active-menu');
            }

        });

    };

    toggleMenu();

    // popUp
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn'),
            popUpContent = document.querySelector('.popup-content');

        popUpBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popUp.style.display = 'block';
            });
        });

        popUp.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    popUp.style.display = 'none';
                }
            }
        });

        // анимация popUp
        if (document.body.clientWidth > 768) {

            popUpBtn.forEach(elem => {
                elem.addEventListener('click', () => {
                    const start = Date.now();

                    const timer = setInterval(() => {

                        const timePassed = Date.now() - start;

                        if (timePassed >= 2000) {
                            clearInterval(timer);
                            return;
                        }

                        function draw(timePassed) {
                            popUpContent.style.top = timePassed / 6 + 'px';
                        }

                        draw(timePassed);

                    }, 10);
                });
            });
        }

    };

    togglePopUp();

    // tabs

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = document.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

});
