import { OrbitControls, SpotLight, useGLTF } from "@react-three/drei";
import { BallCollider, Physics, RigidBody } from "@react-three/rapier";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Experience = () => {
  const boxCount = 20;
  const cursor = useRef();
  const vec = new THREE.Vector3();
  const boxRef = useRef([]);
  const model = useGLTF("./model/robot.glb");
  console.log(model);

  useFrame(() => {
    cursor.current?.setNextKinematicTranslation(vec.set(1000, 1000, 0));
  }, []);

  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    const pointerPosition = vec.set(x, y, 0);

    cursor.current.setNextKinematicTranslation(pointerPosition);

    // repulsion
    boxRef.current.forEach((box) => {
      if (!box) return;
      const boxPosition = box.translation();
      const direction = pointerPosition.clone().sub(boxPosition).normalize();
      box.applyImpulse(direction.multiplyScalar(0.1), true);
    });
  });

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 2, 3]} intensity={0.8} />
      <Physics gravity={[0, 0, 0]}>
        {[...Array(boxCount)].map((_, index) => {
          return (
            <RigidBody
              key={index}
              ref={(ref) => {
                boxRef.current[index] = ref;
              }}
              linearDamping={2}
              angularDamping={0.5}
            >
              <mesh
                position={[
                  (Math.random() - 0.5) * 5,
                  (Math.random() - 0.5) * 5,
                  0,
                ]}
              >
                <boxGeometry />
                <meshNormalMaterial />
              </mesh>
            </RigidBody>
          );
        })}
        {/* <Pointer /> */}
        <RigidBody type="kinematicPosition" ref={cursor}>
          <BallCollider args={[1]} />
          <mesh>
            <sphereGeometry />
            <meshStandardMaterial color={"gold"} />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
};

export default Experience;
