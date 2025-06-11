
(() => {
  // Assuming React and ReactDOM are globally available from CDN
  const React = window.React;
  const ReactDOM = window.ReactDOM;

  // constants.ts
  const APP_NAME = "わくわくトレーニング";
  const WORKOUT_DURATION_STEP_SECONDS = 30;
  const POINTS_PER_STEP = 1;
  const MIN_WORKOUT_DURATION_STEPS = 1;
  const MAX_WORKOUT_DURATION_STEPS = 6;
  const DEFAULT_WORKOUT_DURATION_STEPS = 1;
  const WORKOUTS_DATA_BASE = [
    { id: 'w1', name: '懸垂', description: '自分の体重を腕と背中の力で持ち上げる運動。主に広背筋や僧帽筋など、背中の広い範囲の筋肉を鍛えられます。', instructions: '自分の体重を腕と背中の力で持ち上げる運動。主に広背筋や僧帽筋など、背中の広い範囲の筋肉を鍛えられます。', image: 'https://illust8.com/wp-content/uploads/2022/06/kensui_training_16744.png' },
    { id: 'w2', name: 'プランク', description: 'うつ伏せで体を一直線に保つ体幹トレーニング。腹筋群を中心に、全身の筋肉を使い、姿勢の改善にも繋がります。', instructions: 'うつ伏せで体を一直線に保つ体幹トレーニング。腹筋群を中心に、全身の筋肉を使い、姿勢の改善にも繋がります。', image: 'https://illust8.com/wp-content/uploads/2022/06/push-ups_16739-768x591.png' },
    { id: 'w3', name: 'スクワット', description: '「キング・オブ・トレーニング」とも呼ばれ、下半身全体を効率よく鍛える運動。お尻や太ももの筋肉に効果的です。', instructions: '「キング・オブ・トレーニング」とも呼ばれ、下半身全体を効率よく鍛える運動。お尻や太ももの筋肉に効果的です。', image: 'https://illust8.com/wp-content/uploads/2022/06/training_squat_female_16623.png' },
    { id: 'w4', name: 'ヨガ', description: '呼吸とポーズ、瞑想を組み合わせ、心身のバランスを整える。柔軟性向上やリラックス効果、ストレス軽減が期待できます。', instructions: '呼吸とポーズ、瞑想を組み合わせ、心身のバランスを整える。柔軟性向上やリラックス効果、ストレス軽減が期待できます。', image: 'https://illust8.com/wp-content/uploads/2022/05/yoga_ki-pause_stretch_16535-768x689.png' }
  ];
  const ILLUSTRATIONS_DATA = [
    { id: 'gallery1', name: 'チャイナドレス', cost: 1, thumbnailUrl: 'https://image.cdn2.seaart.me/2025-06-10/d140c35e878c738cqbug/f2644c2ecb0a4aa30b389b246f1effaf_high.webp', fullImageUrl: 'https://image.cdn2.seaart.me/2025-06-10/d140c35e878c738cqbug/f2644c2ecb0a4aa30b389b246f1effaf_high.webp' },
    { id: 'gallery2', name: '浴衣', cost: 1, thumbnailUrl: 'https://image.cdn2.seaart.me/2025-06-10/d140blde878c73cb8r50/dd39ce67a0e84e76185df0859be24e6c_high.webp', fullImageUrl: 'https://image.cdn2.seaart.me/2025-06-10/d140blde878c73cb8r50/dd39ce67a0e84e76185df0859be24e6c_high.webp' },
    { id: 'gallery3', name: 'バニーガール', cost: 2, thumbnailUrl: 'https://image.cdn2.seaart.me/2025-06-10/d140bdde878c738ckl4g/c20c67e389f7dd99d877c074fce33407_high.webp', fullImageUrl: 'https://image.cdn2.seaart.me/2025-06-10/d140bdde878c738ckl4g/c20c67e389f7dd99d877c074fce33407_high.webp' },
    { id: 'gallery4', name: 'ビキニ', cost: 3, thumbnailUrl: 'https://image.cdn2.seaart.me/2025-06-10/d140cgle878c73f1tehg/643e0352efa267be4c6d22211c87df24_high.webp', fullImageUrl: 'https://image.cdn2.seaart.me/2025-06-10/d140cgle878c73f1tehg/643e0352efa267be4c6d22211c87df24_high.webp' },
  ];
  const POINTS_STORAGE_KEY = 'fitArtRewardsPoints';
  const UNLOCKED_ILLUSTRATIONS_STORAGE_KEY = 'fitArtRewardsUnlocked';
  const SOUND_WORKOUT_START = 'sounds/workout-start.mp3';
  const SOUND_WORKOUT_COMPLETE = 'sounds/workout-complete.mp3';
  const SOUND_GALLERY_UNLOCK = 'sounds/gallery-unlock.mp3';

  // utils/soundUtils.ts
  const playSound = (soundFile) => {
    try {
      const audio = new Audio(soundFile);
      audio.play().catch(error => {
        console.warn(`Could not play sound: ${soundFile}`, error);
      });
    } catch (error) {
      console.error(`Error initializing sound: ${soundFile}`, error);
    }
  };

  // components/icons/LockIcon.tsx
  const LockIcon = ({ className }) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: `w-5 h-5 ${className || ''}` },
      React.createElement('path', { fillRule: "evenodd", d: "M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z", clipRule: "evenodd" })
    )
  );

  // components/icons/StarIcon.tsx
  const StarIcon = ({ className }) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: `w-5 h-5 ${className || ''}` },
      React.createElement('path', { fillRule: "evenodd", d: "M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z", clipRule: "evenodd" })
    )
  );

  // components/icons/FitnessIcon.tsx
  const FitnessIcon = ({ className }) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: `w-6 h-6 ${className || ''}` },
      React.createElement('path', { d: "M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14L4.14 5.57L2 7.71L3.43 9.14L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22L14.86 20.57L16.29 22L18.43 19.86L19.86 21.29L21.29 19.86L19.86 18.43L22 16.29L20.57 14.86Z" })
    )
  );

  // components/icons/GalleryIcon.tsx
  const GalleryIcon = ({ className }) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: `w-6 h-6 ${className || ''}` },
      React.createElement('path', { d: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" })
    )
  );
  
  // components/icons/PlusIcon.tsx
  const PlusIcon = ({ className }) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: `w-5 h-5 ${className || ''}` },
      React.createElement('path', { d: "M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" })
    )
  );

  // components/icons/MinusIcon.tsx
  const MinusIcon = ({ className }) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: `w-5 h-5 ${className || ''}` },
      React.createElement('path', { d: "M5.75 10.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75z" })
    )
  );

  // components/icons/ClockIcon.tsx
  const ClockIcon = ({ className }) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: `w-6 h-6 ${className || ''}` },
      React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" })
    )
  );

  // components/Button.tsx
  const Button = ({ children, variant = 'primary', size = 'md', className = '', leftIcon, rightIcon, ...props }) => {
    const baseStyles = 'font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center';
    let variantStyles = '';
    switch (variant) {
      case 'primary': variantStyles = 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500'; break;
      case 'secondary': variantStyles = 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400 border border-gray-300'; break;
      case 'danger': variantStyles = 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'; break;
      case 'success': variantStyles = 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400'; break;
      case 'ghost': variantStyles = 'bg-transparent hover:bg-indigo-50 text-indigo-600 focus:ring-indigo-500 shadow-none'; break;
    }
    let sizeStyles = '';
    switch (size) {
      case 'sm': sizeStyles = 'px-3 py-1.5 text-sm'; break;
      case 'md': sizeStyles = 'px-5 py-2.5 text-base'; break;
      case 'lg': sizeStyles = 'px-8 py-3 text-lg'; break;
    }
    return (
      React.createElement('button', { className: `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`, ...props },
        leftIcon && React.createElement('span', { className: "mr-2" }, leftIcon),
        children,
        rightIcon && React.createElement('span', { className: "ml-2" }, rightIcon)
      )
    );
  };

  // components/Header.tsx
  const Header = ({ points, currentView, setView }) => {
    return (
      React.createElement('header', { className: "bg-white shadow-md sticky top-0 z-50" },
        React.createElement('div', { className: "container mx-auto px-4 sm:px-6 lg:px-8" },
          React.createElement('div', { className: "flex items-center justify-between h-20" },
            React.createElement('h1', {
              className: "text-3xl font-bold text-indigo-700 cursor-pointer",
              onClick: () => setView('home'),
              'aria-label': `${APP_NAME} ホーム`
            }, APP_NAME),
            React.createElement('nav', { className: "flex items-center space-x-4" },
              React.createElement(Button, {
                onClick: () => setView('workout_selection'),
                variant: currentView.startsWith('workout') ? 'primary' : 'ghost',
                size: "md",
                leftIcon: React.createElement(FitnessIcon, { className: "w-5 h-5" }),
                'aria-label': "ワークアウトページへ移動"
              }, "ワークアウト"),
              React.createElement(Button, {
                onClick: () => setView('gallery'),
                variant: currentView === 'gallery' || currentView === 'image_fullscreen' ? 'primary' : 'ghost',
                size: "md",
                leftIcon: React.createElement(GalleryIcon, { className: "w-5 h-5" }),
                'aria-label': "ギャラリーページへ移動"
              }, "ギャラリー"),
              React.createElement('div', { className: "flex items-center bg-yellow-400 text-yellow-900 font-semibold px-4 py-2 rounded-full shadow", 'aria-live': "polite" },
                React.createElement(StarIcon, { className: "w-6 h-6 mr-2 text-yellow-700" }),
                React.createElement('span', null, `${points} ポイント`)
              )
            )
          )
        )
      )
    );
  };

  // components/DurationSelectionModal.tsx
  const DurationSelectionModal = ({ workout, onStart, onCancel }) => {
    const [currentSteps, setCurrentSteps] = React.useState(DEFAULT_WORKOUT_DURATION_STEPS);
    const currentDuration = currentSteps * WORKOUT_DURATION_STEP_SECONDS;
    const currentPoints = currentSteps * POINTS_PER_STEP;

    const incrementSteps = () => setCurrentSteps(prev => Math.min(prev + 1, MAX_WORKOUT_DURATION_STEPS));
    const decrementSteps = () => setCurrentSteps(prev => Math.max(prev - 1, MIN_WORKOUT_DURATION_STEPS));

    React.useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === 'Escape') onCancel();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onCancel]);

    return (
      React.createElement('div', {
          className: "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4",
          onClick: onCancel, role: "dialog", 'aria-modal': "true", 'aria-labelledby': "duration-modal-title"
        },
        React.createElement('div', {
            className: "bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all",
            onClick: (e) => e.stopPropagation()
          },
          React.createElement('h2', { id: "duration-modal-title", className: "text-2xl sm:text-3xl font-bold text-indigo-700 mb-6 text-center" },
            `${workout.name} - 時間設定`
          ),
          React.createElement('div', { className: "mb-6 text-center" },
            React.createElement('p', { className: "text-lg text-gray-700 mb-2" }, "ワークアウトの時間を選択してください。"),
            React.createElement('div', { className: "flex items-center justify-center space-x-4 my-4" },
              React.createElement(Button, { onClick: decrementSteps, disabled: currentSteps <= MIN_WORKOUT_DURATION_STEPS, variant: "secondary", size: "md", 'aria-label': "時間を減らす", className: "p-3" },
                React.createElement(MinusIcon, { className: "w-5 h-5" })
              ),
              React.createElement('div', { className: "text-3xl sm:text-4xl font-bold text-indigo-600 w-28 text-center", 'aria-live': "polite" }, `${currentDuration}秒`),
              React.createElement(Button, { onClick: incrementSteps, disabled: currentSteps >= MAX_WORKOUT_DURATION_STEPS, variant: "secondary", size: "md", 'aria-label': "時間を増やす", className: "p-3" },
                React.createElement(PlusIcon, { className: "w-5 h-5" })
              )
            ),
            React.createElement('p', { className: "text-xs text-gray-500" }, `(${MIN_WORKOUT_DURATION_STEPS * WORKOUT_DURATION_STEP_SECONDS}秒 から ${MAX_WORKOUT_DURATION_STEPS * WORKOUT_DURATION_STEP_SECONDS}秒まで)`)
          ),
          React.createElement('div', { className: "mb-8 p-4 bg-indigo-50 rounded-lg text-center" },
            React.createElement('div', { className: "flex items-center justify-center text-xl sm:text-2xl font-semibold text-green-600" },
              React.createElement(StarIcon, { className: "w-6 h-6 mr-2 text-yellow-500" }),
              `獲得予定ポイント: ${currentPoints}`
            ),
            React.createElement('div', { className: "flex items-center justify-center text-md sm:text-lg text-gray-600 mt-1" },
              React.createElement(ClockIcon, { className: "w-5 h-5 mr-2 text-gray-500" }),
              `選択中の時間: ${currentDuration}秒`
            )
          ),
          React.createElement('div', { className: "flex flex-col sm:flex-row gap-3" },
            React.createElement(Button, { onClick: () => onStart(currentDuration, currentPoints), variant: "primary", size: "lg", className: "w-full" }, "この設定で開始"),
            React.createElement(Button, { onClick: onCancel, variant: "ghost", size: "lg", className: "w-full" }, "キャンセル")
          )
        )
      )
    );
  };

  // components/WorkoutSelector.tsx
  const WorkoutSelector = ({ workouts, onSelectWorkout }) => {
    const [durationModalOpen, setDurationModalOpen] = React.useState(false);
    const [selectedWorkoutForModal, setSelectedWorkoutForModal] = React.useState(null);

    const handleOpenDurationModal = (workout) => {
      setSelectedWorkoutForModal(workout);
      setDurationModalOpen(true);
    };
    const handleCloseDurationModal = () => {
      setDurationModalOpen(false);
      setSelectedWorkoutForModal(null);
    };
    const handleStartWorkoutWithDuration = (duration, points) => {
      if (selectedWorkoutForModal) {
        onSelectWorkout(selectedWorkoutForModal, duration, points);
        handleCloseDurationModal();
      }
    };

    return (
      React.createElement('div', { className: "p-4 sm:p-6 lg:p-8" },
        React.createElement('h2', { className: "text-3xl font-semibold text-gray-800 mb-8 text-center" }, "ワークアウトを選択"),
        React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" },
          workouts.map((workout) => (
            React.createElement('div', { key: workout.id, className: "bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300" },
              workout.image && React.createElement('img', { src: workout.image, alt: workout.name, className: "w-full h-48 object-contain bg-gray-100" }),
              React.createElement('div', { className: "p-6" },
                React.createElement('h3', { className: "text-xl font-semibold text-indigo-700 mb-2" }, workout.name),
                React.createElement('p', { className: "text-gray-600 text-sm mb-3 h-16 overflow-y-auto" }, workout.description),
                React.createElement('div', { className: "flex justify-between items-center mb-4" },
                  React.createElement('span', { className: "text-sm text-gray-500" }, "時間を選択"),
                  React.createElement('span', { className: "text-sm font-medium text-green-500" }, "ポイント獲得")
                ),
                React.createElement(Button, { onClick: () => handleOpenDurationModal(workout), variant: "primary", className: "w-full", leftIcon: React.createElement(FitnessIcon, { className: "w-5 h-5" }) }, "ワークアウト開始")
              )
            )
          ))
        ),
        durationModalOpen && selectedWorkoutForModal && React.createElement(DurationSelectionModal, {
          workout: selectedWorkoutForModal,
          onStart: handleStartWorkoutWithDuration,
          onCancel: handleCloseDurationModal
        })
      )
    );
  };
  
  // components/WorkoutInProgress.tsx
  const AD_DURATION_SECONDS = 30;
  const AD_VIDEO_URL = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const WorkoutInProgress = ({ workout, onComplete, onCancel }) => {
    const [timeLeft, setTimeLeft] = React.useState(workout.durationSeconds);
    const [showAd, setShowAd] = React.useState(false);
    const [adTimeRemaining, setAdTimeRemaining] = React.useState(0);
    const memoizedOnComplete = React.useCallback(onComplete, [onComplete]);

    React.useEffect(() => {
      setTimeLeft(workout.durationSeconds);
      if (workout.durationSeconds >= AD_DURATION_SECONDS) {
        setShowAd(true);
        setAdTimeRemaining(AD_DURATION_SECONDS);
      } else {
        setShowAd(false);
        setAdTimeRemaining(0);
      }
    }, [workout]);

    React.useEffect(() => {
      if (showAd && adTimeRemaining > 0) {
        const adTimerId = setInterval(() => setAdTimeRemaining(prev => prev - 1), 1000);
        return () => clearInterval(adTimerId);
      } else if (showAd && adTimeRemaining === 0) {
        setShowAd(false);
      }
    }, [showAd, adTimeRemaining]);

    React.useEffect(() => {
      if (timeLeft <= 0) {
        memoizedOnComplete(workout.pointsAwarded);
        return;
      }
      const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timerId);
    }, [timeLeft, workout.pointsAwarded, memoizedOnComplete]);

    const progressPercentage = ((workout.durationSeconds - timeLeft) / workout.durationSeconds) * 100;

    return (
      React.createElement('div', { className: "p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow-2xl" },
        React.createElement('div', { className: "bg-white/20 p-8 rounded-xl shadow-xl max-w-2xl w-full text-center" },
          showAd && React.createElement('div', { className: "mb-6 bg-black/50 p-4 rounded-lg", 'aria-label': "広告エリア" },
            React.createElement('video', {
              src: AD_VIDEO_URL, width: "100%", height: "auto", autoPlay: true, muted: true, loop: false, playsInline: true, className: "rounded",
              onError: (e) => console.error("Ad video error:", e)
            }, "お使いのブラウザはビデオタグをサポートしていません。"),
            React.createElement('p', { className: "text-sm mt-2 text-yellow-300" }, `広告 (残り ${adTimeRemaining} 秒)`)
          ),
          React.createElement('h2', { className: "text-4xl font-bold mb-4" }, workout.name),
          React.createElement('p', { className: "text-lg mb-6 opacity-90 leading-relaxed" }, workout.instructions),
          React.createElement('div', { className: "my-8", role: "timer", 'aria-live': "assertive", 'aria-atomic': "true" },
            React.createElement('div', { className: "relative w-48 h-48 mx-auto" },
              React.createElement('svg', { className: "w-full h-full", viewBox: "0 0 100 100", 'aria-hidden': "true" },
                React.createElement('circle', { className: "text-white/30", strokeWidth: "10", stroke: "currentColor", fill: "transparent", r: "45", cx: "50", cy: "50" }),
                React.createElement('circle', {
                  className: "text-yellow-400", strokeWidth: "10", strokeDasharray: "283", strokeDashoffset: 283 - (283 * progressPercentage) / 100,
                  strokeLinecap: "round", stroke: "currentColor", fill: "transparent", r: "45", cx: "50", cy: "50", transform: "rotate(-90 50 50)"
                })
              ),
              React.createElement('div', { className: "absolute inset-0 flex items-center justify-center" },
                React.createElement('span', { className: "text-6xl font-mono font-bold text-yellow-300" }, timeLeft)
              )
            ),
            React.createElement('p', { className: "mt-2 text-xl" }, "残り秒数")
          ),
          React.createElement(Button, { onClick: onCancel, variant: "danger", size: "lg", className: "bg-white/20 hover:bg-white/30 text-white" }, "ワークアウト中止")
        )
      )
    );
  };

  // components/GalleryItem.tsx
  const GalleryItem = ({ illustration, isUnlocked, canAfford, onUnlock, onView }) => {
    return (
      React.createElement('div', { className: "group bg-white rounded-xl shadow-lg overflow-hidden relative transition-all duration-300 ease-in-out transform hover:shadow-2xl hover:-translate-y-1" },
        React.createElement('img', {
          src: illustration.thumbnailUrl, alt: illustration.name,
          className: `w-full h-48 object-cover transition-all duration-300 ${!isUnlocked ? 'filter grayscale opacity-60' : 'group-hover:opacity-80'}`,
          'aria-label': illustration.name
        }),
        !isUnlocked && React.createElement('div', { className: "absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4" },
          React.createElement(LockIcon, { className: "w-12 h-12 text-white opacity-70 mb-2", 'aria-hidden': "true" }),
          React.createElement('div', { className: "flex items-center text-yellow-400 font-semibold text-lg mb-3" },
            React.createElement(StarIcon, { className: "w-5 h-5 mr-1", 'aria-hidden': "true" }), `${illustration.cost} ポイント`
          ),
          React.createElement(Button, {
            onClick: onUnlock, disabled: !canAfford, variant: canAfford ? "success" : "secondary", size: "sm", className: "w-full",
            'aria-label': `${illustration.name}をアンロックする (${illustration.cost}ポイント必要)`
          }, canAfford ? 'アンロック' : 'ポイント不足')
        ),
        isUnlocked && React.createElement('div', {
            className: "absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300 cursor-pointer",
            onClick: onView, role: "button", tabIndex: 0,
            onKeyDown: (e) => (e.key === 'Enter' || e.key === ' ') && onView(),
            'aria-label': `${illustration.name}を全画面表示`
          },
          React.createElement('span', { className: "text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" }, "全画面表示")
        ),
        React.createElement('div', { className: "p-4" },
          React.createElement('h3', { className: `text-lg font-semibold ${isUnlocked ? 'text-indigo-700' : 'text-gray-500'}` }, illustration.name),
          isUnlocked ?
            React.createElement('p', { className: "text-sm text-green-600" }, "アンロック済み") :
            React.createElement('p', { className: "text-sm text-gray-400" }, "ロック中")
        )
      )
    );
  };

  // components/GalleryView.tsx
  const GalleryView = ({ illustrations, unlockedIllustrationIds, currentPoints, onUnlockIllustration, onViewIllustration }) => {
    return (
      React.createElement('div', { className: "p-4 sm:p-6 lg:p-8" },
        React.createElement('h2', { className: "text-3xl font-semibold text-gray-800 mb-8 text-center" }, "イラストギャラリー"),
        illustrations.length === 0 ?
          React.createElement('p', { className: "text-center text-gray-500" }, "利用可能なイラストはまだありません。") :
          React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" },
            illustrations.map((illustration) => (
              React.createElement(GalleryItem, {
                key: illustration.id,
                illustration: illustration,
                isUnlocked: unlockedIllustrationIds.has(illustration.id),
                canAfford: currentPoints >= illustration.cost,
                onUnlock: () => onUnlockIllustration(illustration),
                onView: () => onViewIllustration(illustration)
              })
            ))
          )
      )
    );
  };

  // components/FullScreenImageView.tsx
  const FullScreenImageView = ({ illustration, onClose }) => {
    React.useEffect(() => {
      const handleEsc = (event) => {
        if (event.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
      React.createElement('div', {
          className: "fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100] p-4",
          onClick: onClose, role: "dialog", 'aria-modal': "true", 'aria-labelledby': "fullscreen-image-title"
        },
        React.createElement('div', {
            className: "bg-white p-4 rounded-lg shadow-2xl max-w-4xl max-h-[90vh] relative",
            onClick: (e) => e.stopPropagation()
          },
          React.createElement('img', { src: illustration.fullImageUrl, alt: illustration.name, className: "max-w-full max-h-[calc(90vh-80px)] object-contain rounded" }),
          React.createElement('h3', { id: "fullscreen-image-title", className: "text-xl font-semibold text-gray-800 mt-3 text-center" }, illustration.name),
          React.createElement(Button, { onClick: onClose, variant: "danger", className: "absolute top-3 right-3", 'aria-label': "全画面画像表示を閉じる" }, "×")
        )
      )
    );
  };

  // App.tsx
  const App = () => {
    const [points, setPoints] = React.useState(0);
    const [unlockedIllustrationIds, setUnlockedIllustrationIds] = React.useState(new Set());
    const [currentView, setCurrentView] = React.useState('home');
    const [activeWorkout, setActiveWorkout] = React.useState(null);
    const [viewingIllustration, setViewingIllustration] = React.useState(null);
    const [showWorkoutCompleteMessage, setShowWorkoutCompleteMessage] = React.useState(null);

    React.useEffect(() => {
      const storedPoints = localStorage.getItem(POINTS_STORAGE_KEY);
      if (storedPoints) setPoints(JSON.parse(storedPoints));
      const storedUnlockedIds = localStorage.getItem(UNLOCKED_ILLUSTRATIONS_STORAGE_KEY);
      if (storedUnlockedIds) setUnlockedIllustrationIds(new Set(JSON.parse(storedUnlockedIds)));
    }, []);

    React.useEffect(() => { localStorage.setItem(POINTS_STORAGE_KEY, JSON.stringify(points)); }, [points]);
    React.useEffect(() => { localStorage.setItem(UNLOCKED_ILLUSTRATIONS_STORAGE_KEY, JSON.stringify(Array.from(unlockedIllustrationIds))); }, [unlockedIllustrationIds]);

    const handleSelectWorkout = React.useCallback((baseWorkout, duration, pointsToAward) => {
      const workoutToStart = { ...baseWorkout, durationSeconds: duration, pointsAwarded: pointsToAward };
      playSound(SOUND_WORKOUT_START);
      setActiveWorkout(workoutToStart);
      setCurrentView('workout_active');
    }, []);

    const handleWorkoutComplete = React.useCallback((pointsAwarded) => {
      setPoints(prev => prev + pointsAwarded);
      playSound(SOUND_WORKOUT_COMPLETE);
      setActiveWorkout(null);
      setCurrentView('workout_selection');
      setShowWorkoutCompleteMessage(`おめでとうございます！${pointsAwarded}ポイント獲得しました！`);
      setTimeout(() => setShowWorkoutCompleteMessage(null), 3000);
    }, []);

    const handleWorkoutCancel = React.useCallback(() => {
      setActiveWorkout(null);
      setCurrentView('workout_selection');
    }, []);

    const handleUnlockIllustration = React.useCallback((illustration) => {
      if (points >= illustration.cost && !unlockedIllustrationIds.has(illustration.id)) {
        setPoints(prev => prev - illustration.cost);
        setUnlockedIllustrationIds(prev => new Set(prev).add(illustration.id));
        playSound(SOUND_GALLERY_UNLOCK);
        setViewingIllustration(illustration);
        setCurrentView('image_fullscreen');
      }
    }, [points, unlockedIllustrationIds]);

    const handleViewIllustration = React.useCallback((illustration) => {
      setViewingIllustration(illustration);
      setCurrentView('image_fullscreen');
    }, []);

    const handleCloseFullScreenImage = React.useCallback(() => {
      setViewingIllustration(null);
      setCurrentView('gallery');
    }, []);

    const renderView = () => {
      switch (currentView) {
        case 'home':
          return React.createElement('div', { className: "flex flex-col items-center justify-center text-center p-8 min-h-[calc(100vh-10rem)]" },
            React.createElement('img', { src: "https://image.cdn2.seaart.me/2025-06-10/d1403m5e878c73c99qog/c9035b2143475b0fd3d6ebaed96867ea_high.webp", alt: "フィットネスアートのモチベーションを高める画像", className: "w-full max-w-2xl aspect-square mx-auto rounded-lg shadow-xl mb-8 object-cover" }),
            React.createElement('h2', { className: "text-4xl font-bold text-gray-800 mb-6" }, APP_NAME + "へようこそ！"),
            React.createElement('p', { className: "text-xl text-gray-600 mb-10 max-w-2xl" }, "ワークアウトを完了してポイントを獲得し、そのポイントを使ってギャラリーの美しいデジタルイラストをアンロックしましょう。"),
            React.createElement('div', { className: "space-y-4 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row" },
              React.createElement(Button, { onClick: () => setCurrentView('workout_selection'), variant: "primary", size: "lg", leftIcon: React.createElement(FitnessIcon, null) }, "ワークアウト開始"),
              React.createElement(Button, { onClick: () => setCurrentView('gallery'), variant: "secondary", size: "lg", leftIcon: React.createElement(GalleryIcon, null) }, "ギャラリーを見る")
            )
          );
        case 'workout_selection':
          return React.createElement(WorkoutSelector, { workouts: WORKOUTS_DATA_BASE, onSelectWorkout: handleSelectWorkout });
        case 'workout_active':
          if (!activeWorkout) { setCurrentView('workout_selection'); return null; }
          return React.createElement(WorkoutInProgress, { workout: activeWorkout, onComplete: handleWorkoutComplete, onCancel: handleWorkoutCancel });
        case 'gallery':
          return React.createElement(GalleryView, {
            illustrations: ILLUSTRATIONS_DATA,
            unlockedIllustrationIds: unlockedIllustrationIds,
            currentPoints: points,
            onUnlockIllustration: handleUnlockIllustration,
            onViewIllustration: handleViewIllustration
          });
        case 'image_fullscreen':
          if (!viewingIllustration) { setCurrentView('gallery'); return null; }
          return React.createElement(FullScreenImageView, { illustration: viewingIllustration, onClose: handleCloseFullScreenImage });
        default:
          return React.createElement('div', { className: "text-center p-8" }, "ページが見つかりません。");
      }
    };

    return (
      React.createElement('div', { className: "min-h-screen flex flex-col bg-gray-50" },
        React.createElement(Header, { points: points, currentView: currentView, setView: setCurrentView }),
        React.createElement('main', { className: "flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8" },
          showWorkoutCompleteMessage && React.createElement('div', {
            className: "fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-[1000] transition-opacity duration-300",
            role: "alert", 'aria-live': "assertive"
          }, showWorkoutCompleteMessage),
          renderView()
        ),
        React.createElement('footer', { className: "bg-gray-800 text-white text-center p-4" },
          React.createElement('p', null, `© ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.`)
        )
      )
    );
  };

  // index.tsx (entry point)
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  if (ReactDOM && typeof ReactDOM.createRoot === 'function') {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      React.createElement(React.StrictMode, null, React.createElement(App))
    );
  } else if (ReactDOM && typeof ReactDOM.render === 'function') { // Fallback for older React versions
    ReactDOM.render(
      React.createElement(React.StrictMode, null, React.createElement(App)),
      rootElement
    );
  } else {
    console.error('ReactDOM.createRoot (or ReactDOM.render) is not available. Ensure React and ReactDOM are loaded globally.');
  }

})();
